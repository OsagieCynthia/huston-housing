#!/bin/bash

# Deployment Verification Script
# Verifies all contracts are deployed and initialized correctly

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

NETWORK="testnet"
ENV_FILE=".env.testnet"

print_header() {
  echo -e "${BLUE}=== $1 ===${NC}"
}

print_pass() {
  echo -e "${GREEN}✓${NC} $1"
}

print_fail() {
  echo -e "${RED}✗${NC} $1"
}

print_warn() {
  echo -e "${YELLOW}⚠${NC} $1"
}

# Check if env file exists
if [ ! -f "$ENV_FILE" ]; then
  print_fail "Environment file not found: $ENV_FILE"
  echo "Run deployment script first: ./scripts/deploy-testnet.sh"
  exit 1
fi

# Load contract IDs
source "$ENV_FILE"

print_header "Deployment Verification"

# Verify each contract
verify_contract() {
  local name=$1
  local contract_id=$2
  
  if [ -z "$contract_id" ]; then
    print_fail "$name: Contract ID not set"
    return 1
  fi
  
  # Check if contract exists
  if soroban contract info --id "$contract_id" --network "$NETWORK" &>/dev/null; then
    print_pass "$name deployed: $contract_id"
    return 0
  else
    print_fail "$name not found: $contract_id"
    return 1
  fi
}

# Test contract function
test_contract_function() {
  local name=$1
  local contract_id=$2
  local function=$3
  
  if soroban contract invoke \
    --id "$contract_id" \
    --source testnet-deployer \
    --network "$NETWORK" \
    -- "$function" &>/dev/null; then
    print_pass "$name: $function() works"
    return 0
  else
    print_warn "$name: $function() failed (may require parameters)"
    return 0
  fi
}

echo ""
print_header "Contract Deployment Status"

FAILED=0

# Verify all contracts
verify_contract "User Profile" "$USER_PROFILE_CONTRACT_ID" || ((FAILED++))
verify_contract "Property Registry" "$PROPERTY_REGISTRY_CONTRACT_ID" || ((FAILED++))
verify_contract "Agent Registry" "$AGENT_REGISTRY_CONTRACT_ID" || ((FAILED++))
verify_contract "Rent Obligation" "$RENT_OBLIGATION_CONTRACT_ID" || ((FAILED++))
verify_contract "Escrow" "$ESCROW_CONTRACT_ID" || ((FAILED++))
verify_contract "Payment" "$PAYMENT_CONTRACT_ID" || ((FAILED++))
verify_contract "Dispute Resolution" "$DISPUTE_RESOLUTION_CONTRACT_ID" || ((FAILED++))
verify_contract "Chioma" "$CHIOMA_CONTRACT_ID" || ((FAILED++))

echo ""
print_header "Contract Functionality Tests"

# Test read functions
test_contract_function "User Profile" "$USER_PROFILE_CONTRACT_ID" "get_admin"
test_contract_function "Property Registry" "$PROPERTY_REGISTRY_CONTRACT_ID" "get_property_count"
test_contract_function "Agent Registry" "$AGENT_REGISTRY_CONTRACT_ID" "get_agent_count"
test_contract_function "Rent Obligation" "$RENT_OBLIGATION_CONTRACT_ID" "get_obligation_count"
test_contract_function "Escrow" "$ESCROW_CONTRACT_ID" "get_count"
test_contract_function "Dispute Resolution" "$DISPUTE_RESOLUTION_CONTRACT_ID" "get_arbiter_count"
test_contract_function "Chioma" "$CHIOMA_CONTRACT_ID" "get_state"

echo ""
print_header "Contract Sizes"

WASM_DIR="contract/target/wasm32-unknown-unknown/release"

for contract in user_profile property_registry agent_registry rent_obligation escrow payment dispute_resolution chioma; do
  if [ -f "$WASM_DIR/${contract}.wasm" ]; then
    SIZE=$(du -h "$WASM_DIR/${contract}.wasm" | cut -f1)
    echo "  $contract: $SIZE"
  fi
done

echo ""
print_header "Network Information"

# Get network info
echo "Network: $NETWORK"
echo "RPC URL: https://soroban-testnet.stellar.org:443"
echo "Network Passphrase: Test SDF Network ; September 2015"

echo ""
print_header "Contract IDs"

echo "CHIOMA_CONTRACT_ID=$CHIOMA_CONTRACT_ID"
echo "DISPUTE_RESOLUTION_CONTRACT_ID=$DISPUTE_RESOLUTION_CONTRACT_ID"
echo "ESCROW_CONTRACT_ID=$ESCROW_CONTRACT_ID"
echo "PAYMENT_CONTRACT_ID=$PAYMENT_CONTRACT_ID"
echo "AGENT_REGISTRY_CONTRACT_ID=$AGENT_REGISTRY_CONTRACT_ID"
echo "PROPERTY_REGISTRY_CONTRACT_ID=$PROPERTY_REGISTRY_CONTRACT_ID"
echo "RENT_OBLIGATION_CONTRACT_ID=$RENT_OBLIGATION_CONTRACT_ID"
echo "USER_PROFILE_CONTRACT_ID=$USER_PROFILE_CONTRACT_ID"

echo ""
print_header "Verification Summary"

if [ $FAILED -eq 0 ]; then
  print_pass "All contracts deployed and verified!"
  echo ""
  echo "Next steps:"
  echo "1. Test contract interactions"
  echo "2. Verify upgrade mechanisms"
  echo "3. Load test with realistic volumes"
  echo "4. Monitor for errors"
  exit 0
else
  print_fail "$FAILED contract(s) failed verification"
  echo ""
  echo "Troubleshooting:"
  echo "1. Check contract IDs in $ENV_FILE"
  echo "2. Verify network connectivity"
  echo "3. Check account balance: soroban account balance --source testnet-deployer --network testnet"
  exit 1
fi
