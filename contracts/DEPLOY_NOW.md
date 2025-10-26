# 🚀 DEPLOY TO SEPOLIA NOW - 3 SIMPLE STEPS

## ✅ Everything is Ready!

Your contracts are compiled and ready to deploy. Just follow these 3 steps:

---

## 📝 STEP 1: Create Your .env File

Open terminal in the `contracts` folder and run:

```bash
cp env.template .env
```

Then edit the `.env` file and add:

1. **Your Private Key** (from MetaMask)
   - Open MetaMask → Click 3 dots → Account details → Show private key
   - Copy it WITHOUT the `0x` prefix

2. **RPC URL** (choose one):
   - Use default: `https://ethereum-sepolia-rpc.publicnode.com`
   - OR get free API from [Alchemy](https://www.alchemy.com/) (recommended)

3. **Etherscan API Key** (optional, for verification)
   - Get free at: https://etherscan.io/myapikey

Your `.env` should look like:
```env
PRIVATE_KEY=your_actual_private_key_here
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
ETHERSCAN_API_KEY=your_key_here
```

---

## 💰 STEP 2: Get Sepolia Test ETH

Visit one of these faucets and get free test ETH:

### 🥇 Recommended: Alchemy Faucet
https://www.alchemy.com/faucets/ethereum-sepolia
- Sign in (free)
- Get 0.5 SepoliaETH per day
- Fast and reliable

### Other Options:
- https://sepoliafaucet.com/
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia

You need about **0.1-0.2 SepoliaETH** for deployment.

**Check your balance:**
```bash
npm run check:sepolia
```

---

## 🚀 STEP 3: Deploy!

Run this command:

```bash
npm run deploy:sepolia
```

That's it! Your contract will be deployed to Sepolia! 🎉

---

## 📊 What Happens During Deployment?

1. ✅ Connects to Sepolia network
2. ✅ Shows your wallet address and balance
3. ✅ Deploys NftSignFactory contract
4. ✅ Waits for 6 block confirmations
5. ✅ Shows you the contract address
6. ✅ Gives you verification command

---

## 🎯 After Deployment

You'll see something like:

```
✅ NftSignFactory deployed to: 0x123...789

🔍 Verify with:
npx hardhat verify --network sepolia 0x123...789
```

### View Your Contract:
Visit: `https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS`

### Verify Your Contract (Optional):
```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

---

## 🎮 Using Your Deployed Factory

### Option A: Deploy Example Instance
```bash
npm run deploy:example
```

This creates a complete example with a document!

### Option B: Use from Code
```javascript
const factory = await ethers.getContractAt(
  "NftSignFactory", 
  "YOUR_FACTORY_ADDRESS"
);

// Deploy a new document contract
const tx = await factory.deployNftSign(
  "contract.pdf",                    // fileName
  "Partnership Agreement",            // title
  "Agreement between parties",        // description
  "0xSignerAddress",                 // who can sign
  "QmIPFSHashOfDocument"             // IPFS hash
);

const receipt = await tx.wait();
// Get contract address from event
```

### Option C: Check Your Deployments
```bash
npx hardhat console --network sepolia
```

Then:
```javascript
const factory = await ethers.getContractAt("NftSignFactory", "YOUR_ADDRESS");
const myContracts = await factory.getMyDeployments();
console.log(myContracts);
```

---

## 🐛 Troubleshooting

### ❌ Error: "insufficient funds"
→ Get more Sepolia ETH from faucets above

### ❌ Error: "invalid private key"
→ Check your `.env` file, ensure no `0x` prefix

### ❌ Error: "could not detect network"
→ Check your `SEPOLIA_RPC_URL` in `.env`

### ❌ RPC rate limiting
→ Get free API key from Alchemy or Infura

---

## 📚 Need More Help?

- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md)
- **Environment Setup**: [ENV_SETUP.md](./ENV_SETUP.md)
- **Full Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 🎉 Ready?

1. ✅ ~~Hardhat installed~~
2. ✅ ~~Contracts compiled~~
3. ✅ ~~Scripts ready~~
4. ⏳ Create `.env` file
5. ⏳ Get Sepolia ETH
6. ⏳ Run `npm run deploy:sepolia`

**GO DEPLOY YOUR CONTRACTS NOW!** 🚀

---

*This project was successfully migrated from Foundry to Hardhat v3*
*All contracts compile with zero errors ✅*

