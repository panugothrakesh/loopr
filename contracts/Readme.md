# NFT Sign Contracts - Hardhat Project

## 🎉 Ready to Deploy to Sepolia!

This project has been fully migrated from Foundry to Hardhat v3 and is ready for deployment.

## 🚀 Quick Deploy (3 Commands)

```bash
# 1. Setup environment
cp env.template .env
# Edit .env with your private key and RPC URL

# 2. Check your balance
npm run check:sepolia

# 3. Deploy!
npm run deploy:sepolia
```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** ← **START HERE** - 5-minute deployment guide
- **[ENV_SETUP.md](./ENV_SETUP.md)** - Detailed environment setup
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md)** - What was changed

## 📦 What's Included

### Smart Contracts
- **NftSign.sol** - ERC721 NFT contract for document signatures
- **NftSignFactory.sol** - Factory for deploying NftSign instances

### Deployment Scripts
- `deploy.js` - Deploy the factory contract
- `deployExample.js` - Deploy factory + create example instance
- `checkBalance.js` - Check wallet balance before deploying

### Configuration
- `hardhat.config.js` - Hardhat configuration with Sepolia network
- `package.json` - All dependencies and scripts
- `env.template` - Template for environment variables

## ⚡ NPM Scripts

```bash
npm run compile           # Compile contracts
npm run check:sepolia     # Check wallet balance
npm run deploy:sepolia    # Deploy to Sepolia testnet
npm run deploy:example    # Deploy with example instance
npm run verify:sepolia    # Verify on Etherscan
```

## 🔧 Setup Requirements

### 1. Environment File
Copy `env.template` to `.env` and fill in:
- Your wallet private key
- Sepolia RPC URL (or use the default public node)
- Etherscan API key (for verification)

### 2. Sepolia Test ETH
Get free test ETH from:
- https://www.alchemy.com/faucets/ethereum-sepolia (Recommended)
- https://sepoliafaucet.com/
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia

## 📊 Project Status

- ✅ Dependencies installed
- ✅ Contracts compiled successfully
- ✅ Deployment scripts ready
- ✅ Sepolia network configured
- ✅ Etherscan verification ready
- ⏳ Waiting for `.env` configuration
- ⏳ Ready to deploy

## 🏗️ Architecture

```
User/DApp
    ↓
NftSignFactory.deployNftSign()
    ↓
Creates → NftSign Contract Instance
    ↓
IntendedSigner.sign()
    ↓
Mints → ERC721 Signature NFT
```

## 🔐 Security

- ⚠️ Never commit `.env` file (already in .gitignore)
- ⚠️ Use a separate wallet for testing
- ⚠️ Get private key from MetaMask securely
- ⚠️ Keep your keys private

## 📖 Learn More

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/)
- [Ethers.js v6](https://docs.ethers.org/v6/)

## 🆘 Troubleshooting

**Compilation errors?**
```bash
rm -rf cache artifacts
npm run compile
```

**Deployment fails?**
- Check your `.env` file is configured
- Verify you have enough Sepolia ETH
- Try a different RPC URL (Alchemy/Infura)

**Need help with setup?**
- See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions

## 📞 Support

Check the documentation files in this directory:
1. [QUICKSTART.md](./QUICKSTART.md) - Quick deployment
2. [ENV_SETUP.md](./ENV_SETUP.md) - Environment setup
3. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Full guide

---

**Ready to deploy?** → Open [QUICKSTART.md](./QUICKSTART.md) and follow the steps! 🚀
