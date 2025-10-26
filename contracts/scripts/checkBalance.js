const hre = require("hardhat");

async function main() {
  console.log("🔍 Checking wallet setup for", hre.network.name);
  console.log("━".repeat(50));

  const [deployer] = await hre.ethers.getSigners();
  
  console.log("📍 Address:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  const balanceInEth = hre.ethers.formatEther(balance);
  
  console.log("💰 Balance:", balanceInEth, "ETH");
  
  if (hre.network.name === "sepolia") {
    const minBalance = 0.05; // Minimum recommended balance
    if (parseFloat(balanceInEth) < minBalance) {
      console.log("\n⚠️  WARNING: Balance is low!");
      console.log(`   You need at least ${minBalance} SepoliaETH for deployment`);
      console.log("   Get testnet ETH from:");
      console.log("   - https://www.alchemy.com/faucets/ethereum-sepolia");
      console.log("   - https://sepoliafaucet.com/");
    } else {
      console.log("\n✅ Balance looks good! Ready to deploy.");
    }
  }
  
  console.log("━".repeat(50));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });

