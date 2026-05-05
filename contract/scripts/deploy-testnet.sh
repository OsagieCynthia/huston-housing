#!/bin/bash

# Testnet Deployment Script
# Deploys all Chioma contracts to Stellar testnet

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
NETWORK="testnet"
DEPLOYER_KEY="${DEPLOYER_KEY:-testnet-deployer}"
WASM_DIR="contract/target/wasm32-unknown-unknown/release"
ENV_FILE=".env.testnet"

# Contract order (dependencies)
CONTRACTS=(
  "user_profile"
  "property_registry"
  "agent_registry"
  "rent_obligation"
  "escrow"
  "payment"
  "dispute_resolution"
  "chioma"
)

# Function to print colored output
print_status() {
  echo -e "${GREEN}[*]${NC} $1"
}

print_error() {
  echo -e "${RED}[!]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[!]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
  print_status "Checking prerequisites..."
  
  if ! command -v soroban &> /dev/null; then
    print_error "Soroban CLI not found. Install with: cargo install soroban-cli"
    exit 1
  fi
  
  if ! command -v cargo &> /dev/null; then
    print_error "Cargo not found. Install Rust from https://rustup.rs/"
    exit 1
  fi
  
  # Check account balance
  BALANCE=$(soroban account balance --source "$DEPLOYER_KEY" --network "$NETWORK" 2>/dev/null || echo "0")
  if [ "$BALANCE" = "0" ]; then
    print_error "Account has no balance. Fund at: https://friendbot.stellar.org/"
    exit 1
  fi
  
  print_status "Account balance: $BALANCE XLM"
}

# Build contracts
build_contracts() {
  print_status "Building contracts in release mode..."
  cd contract
  cargo build --release
  cd ..
  print_status "Build complete"
}

# Deploy a single contract
deploy_contract() {
  local contract=$1
  local wasm_file="$WASM_DIR/${contract}.wasm"
  
  if [ ! -f "$wasm_file" ]; then
    print_error "WASM file not found: $wasm_file"
    return 1
  fi
  
  print_status "Deploying $contract..."
  
  CONTRACT_ID=$(soroban contract deploy \
    --wasm "$wasm_file" \
    --source "$DEPLOYER_KEY" \
    --network "$NETWORK" 2>&1 | grep -oP 'Contract ID: \K[A-Z0-9]+' || echo "")
  
  if [ -z "$CONTRACT_ID" ]; then
    print_error "Failed to deploy $contract"
    return 1
  fi
  
  print_status "$contract deployed: $CONTRACT_ID"
  
  # Save to env file
  CONTRACT_VAR="${contract^^}_CONTRACT_ID"
  CONTRACT_VAR="${CONTRACT_VAR//-/_}"
  echo "${CONTRACT_VAR}=${CONTRACT_ID}" >> "$ENV_FILE"
  
  return 0
}

# Initialize contract
initialize_contract() {
  local contract=$1
  local contract_id=$2
  local admin=${3:-$DEPLOYER_KEY}
  
  print_status "Initializing $contract..."
  
  case $contract in
    "user_profile"|"property_registry"|"agent_registry")
      soroban contract invoke \
        --id "$contract_id" \
        --source "$DEPLOYER_KEY" \
        --network "$NETWORK" \
        -- initialize \
        --admin "$admin"
      ;;
    "rent_obligation")
      soroban contract invoke \
        --id "$contract_id" \
        --source "$DEPLOYER_KEY" \
        --network "$NETWORK" \
        -- initialize
      ;;
    "escrow")
      soroban contract invoke \
        --id "$contract_id" \
        --source "$DEPLOYER_KEY" \
        --network "$NETWORK" \
        -- initialize_admin \
        --admin "$admin"
      ;;
    "payment")
      soroban contract invoke \
        --id "$contract_id" \
        --source "$DEPLOYER_KEY" \
        --network "$NETWORK" \
        -- set_platform_fee_collector \
        --collector "$admin"
      ;;
    "dispute_resolution")
      # Get chioma contract ID from env
      source "$ENV_FILE" 2>/dev/null || true
      CHIOMA_ID="${CHIOMA_CONTRACT_ID}"
      if [ -z "$CHIOMA_ID" ]; then
        print_warning "Chioma contract ID not found. Skipping dispute_resolution init."
        return 0
      fi
      soroban contract invoke \
        --id "$contract_id" \
        --source "$DEPLOYER_KEY" \
        --network "$NETWORK" \
        -- initialize \
        --admin "$admin" \
        --min_votes_required 3 \
        --chioma_contract "$CHIOMA_ID"
      ;;
    "chioma")
      soroban contract invoke \
        --id "$contract_id" \
        --source "$DEPLOYER_KEY" \
        --network "$NETWORK" \
        -- initialize \
        --admin "$admin" \
        --config '{"fee_bps": 500, "paused": false}'
      ;;
  esac
  
  print_status "$contract initialized"
}

# Main deployment flow
main() {
  print_status "Starting testnet deployment..."
  
  # Check prerequisites
  check_prerequisites
  
  # Build contracts
  build_contracts
  
  # Clear env file
  > "$ENV_FILE"
  
  # Get admin address
  ADMIN=$(soroban keys show "$DEPLOYER_KEY" 2>/dev/null | grep "Public Key" | awk '{print $NF}')
  if [ -z "$ADMIN" ]; then
    print_error "Could not get admin address"
    exit 1
  fi
  
  print_status "Admin address: $ADMIN"
  
  # Deploy all contracts
  for contract in "${CONTRACTS[@]}"; do
    if ! deploy_contract "$contract"; then
      print_error "Deployment failed at $contract"
      exit 1
    fi
    sleep 2  # Rate limiting
  done
  
  print_status "All contracts deployed"
  
  # Initialize contracts (in reverse order for dependencies)
  for contract in "${CONTRACTS[@]}"; do
    CONTRACT_VAR="${contract^^}_CONTRACT_ID"
    CONTRACT_VAR="${CONTRACT_VAR//-/_}"
    CONTRACT_ID=$(grep "^${CONTRACT_VAR}=" "$ENV_FILE" | cut -d= -f2)
    
    if [ -z "$CONTRACT_ID" ]; then
      print_error "Contract ID not found for $contract"
      continue
    fi
    
    if ! initialize_contract "$contract" "$CONTRACT_ID" "$ADMIN"; then
      print_warning "Initialization failed for $contract, continuing..."
    fi
    sleep 2  # Rate limiting
  done
  
  print_status "Deployment complete!"
  print_status "Contract IDs saved to: $ENV_FILE"
  echo ""
  echo "Contract IDs:"
  cat "$ENV_FILE"
}

# Run main function
main "$@"
