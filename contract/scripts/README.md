# Deployment Scripts

Automated scripts for deploying Chioma contracts to Stellar testnet.

## Scripts

### deploy-testnet.sh

Automated deployment of all contracts to testnet.

**Usage:**

```bash
./scripts/deploy-testnet.sh
```

**What it does:**

1. Checks prerequisites (Soroban CLI, Cargo, account balance)
2. Builds all contracts in release mode
3. Deploys contracts in correct order
4. Initializes each contract with proper parameters
5. Saves contract IDs to `.env.testnet`

**Requirements:**

- Soroban CLI installed
- Testnet account created and funded
- Testnet network configured
- `DEPLOYER_KEY` environment variable set (default: `testnet-deployer`)

**Output:**

- `.env.testnet` file with all contract IDs
- Console output showing deployment progress

### verify-deployment.sh

Verifies all contracts are deployed and working correctly.

**Usage:**

```bash
./scripts/verify-deployment.sh
```

**What it does:**

1. Loads contract IDs from `.env.testnet`
2. Verifies each contract exists on testnet
3. Tests basic contract functions
4. Shows contract sizes
5. Displays network information
6. Provides summary and next steps

**Requirements:**

- `.env.testnet` file with contract IDs
- Soroban CLI installed
- Network connectivity to testnet

**Output:**

- Verification status for each contract
- Contract sizes
- Network information
- Summary of deployment status

## Quick Start

```bash
# 1. Set up testnet account
soroban keys generate --name testnet-deployer
soroban network add --name testnet \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015"

# 2. Fund account at https://friendbot.stellar.org/

# 3. Deploy contracts
cd contract
./scripts/deploy-testnet.sh

# 4. Verify deployment
./scripts/verify-deployment.sh
```

## Environment Variables

### Required

- `DEPLOYER_KEY` - Soroban key name for deployment (default: `testnet-deployer`)

### Optional

- `NETWORK` - Network name (default: `testnet`)
- `WASM_DIR` - WASM directory (default: `contract/target/wasm32-unknown-unknown/release`)

## Troubleshooting

### Script fails to run

```bash
# Make scripts executable
chmod +x scripts/deploy-testnet.sh
chmod +x scripts/verify-deployment.sh
```

### Deployment fails

```bash
# Check account balance
soroban account balance --source testnet-deployer --network testnet

# Fund at https://friendbot.stellar.org/

# Check network
soroban network list
```

### Verification fails

```bash
# Check .env.testnet exists
ls -la .env.testnet

# Check contract IDs
cat .env.testnet

# Verify contract manually
soroban contract info --id <CONTRACT_ID> --network testnet
```

## Manual Deployment

If scripts don't work, deploy manually:

```bash
# Build
cargo build --release

# Deploy contract
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/<CONTRACT>.wasm \
  --source testnet-deployer \
  --network testnet

# Initialize contract
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source testnet-deployer \
  --network testnet \
  -- initialize --admin <ADMIN_KEY>
```

## Support

- See `TESTNET_QUICKSTART.md` for quick start
- See `docs/deployment/TESTNET_DEPLOYMENT.md` for detailed guide
- See `DEPLOYMENT_CHECKLIST.md` for checklist
