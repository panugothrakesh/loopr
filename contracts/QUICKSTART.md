# 🚀 Quick Start Guide - Deploy to Sepolia in 5 Minutes

## ✅ What's Been Set Up

Your project has been fully migrated from Foundry to **Hardhat v3** with:
- ✅ Hardhat configuration optimized for your contracts
- ✅ OpenZeppelin contracts (v5.2.0) installed
- ✅ Deployment scripts ready
- ✅ Sepolia network configured
- ✅ Etherscan verification ready
- ✅ All contracts compiled successfully

## 📁 Project Structure

```
contracts/
├── contracts_src/           # Your Solidity contracts
│   ├── contract-nft.sol    # NftSign contract
│   └── NftSignFactory.sol  # Factory contract
├── scripts/                 # Deployment scripts
│   ├── deploy.js           # Deploy factory only
│   ├── deployExample.js    # Deploy + create example instance
│   └── checkBalance.js     # Check wallet balance
├── hardhat.config.js       # Hardhat configuration
├── package.json            # Dependencies
└── .env                    # Your private keys (YOU NEED TO CREATE THIS)
```

## 🎯 Deploy in 5 Steps

### Step 1: Create Your .env File

Create a file named `.env` in the `contracts` directory:

```bash
cd contracts
touch .env
```

Add this content (replace with your actual values):

```env
PRIVATE_KEY=your_private_key_without_0x_prefix
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
ETHERSCAN_API_KEY=your_etherscan_api_key
```

📚 **Need help?** See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions

### Step 2: Get Sepolia Test ETH

Get free testnet ETH from any of these faucets:
- https://www.alchemy.com/faucets/ethereum-sepolia (Recommended - 0.5 ETH/day)
- https://sepoliafaucet.com/
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia

💡 You need about 0.1-0.2 SepoliaETH

### Step 3: Check Your Setup

```bash
npm run check:sepolia
```

This will show your wallet address and balance.

### Step 4: Deploy!

```bash
npm run deploy:sepolia
```

This deploys the `NftSignFactory` contract.

### Step 5: Verify on Etherscan (Optional)

After deployment, verify your contract:

```bash
npx hardhat verify --network sepolia YOUR_FACTORY_ADDRESS
```

## 🎉 That's It!

Your factory contract is now deployed on Sepolia testnet!

## 📝 What Can You Do Now?

### Option A: Use the Factory from Scripts

See `scripts/deployExample.js` for a complete example:

```bash
npm run deploy:example
```

This will:
1. Deploy the factory
2. Create an NftSign instance with example data
3. Show all contract details

### Option B: Interact via Frontend/Web3

Use the deployed factory address to:
1. Call `deployNftSign()` to create document contracts
2. Get user deployments with `getMyDeployments()`
3. Have signers call `sign()` on their document contracts

### Option C: Use Hardhat Console

```bash
npx hardhat console --network sepolia
```

Then:
```javascript
const factory = await ethers.getContractAt("NftSignFactory", "YOUR_FACTORY_ADDRESS");
const deployments = await factory.getMyDeployments();
console.log(deployments);
```

## 📖 Available Commands

```bash
# Compile contracts
npm run compile

# Check your balance
npm run check:sepolia

# Deploy factory to Sepolia
npm run deploy:sepolia

# Deploy factory + example instance
npm run deploy:example

# Verify contract on Etherscan
npm run verify:sepolia

# Run local Hardhat node
npx hardhat node

# Deploy to local node
npm run deploy:local
```

## 🔍 Your Contracts

### NftSign
- ERC721 NFT for document signatures
- Stores: fileName, documentTitle, description, IPFS hash
- Only intended signer can call `sign()`
- Mints signature NFT when signed

### NftSignFactory
- Creates NftSign contracts
- Tracks all deployments per user
- Makes deployer the owner of new contracts

## 🛠️ Detailed Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[ENV_SETUP.md](./ENV_SETUP.md)** - Environment setup help

## 🐛 Common Issues

### "insufficient funds"
→ Get more Sepolia ETH from faucets above

### "could not detect network"
→ Check your `.env` file has correct SEPOLIA_RPC_URL

### "invalid private key"
→ Make sure private key has no "0x" prefix in .env

### Compilation errors
→ Run `npm install` again

## 🔐 Security Reminders

- ⚠️ **NEVER** commit your `.env` file
- ⚠️ Use a separate wallet for testing
- ⚠️ Don't use real funds on testnet wallets
- ⚠️ The `.gitignore` is already set up to protect you

## 🎓 Learn More

- **Hardhat Docs**: https://hardhat.org/docs
- **OpenZeppelin**: https://docs.openzeppelin.com/
- **Ethers.js**: https://docs.ethers.org/v6/

## 💡 Next Steps

1. Deploy to Sepolia using the steps above
2. Test your contracts on testnet
3. Build your frontend integration
4. When ready, deploy to mainnet (update hardhat.config.js)

Need help? Check the detailed guides in this directory!

