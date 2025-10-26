const hre = require("hardhat");

async function main() {
  console.log("Starting deployment to", hre.network.name);
  
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  // Get account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy NftSignFactory
  console.log("\n📝 Deploying NftSignFactory...");
  const NftSignFactory = await hre.ethers.getContractFactory("NftSignFactory");
  const factory = await NftSignFactory.deploy();
  await factory.waitForDeployment();
  
  const factoryAddress = await factory.getAddress();
  console.log("✅ NftSignFactory deployed to:", factoryAddress);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    factoryAddress: factoryAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  console.log("\n📋 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  // Wait for block confirmations on testnet/mainnet
  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("\n⏳ Waiting for block confirmations...");
    await factory.deploymentTransaction().wait(6);
    console.log("✅ Confirmed!");

    console.log("\n🔍 Verify with:");
    console.log(`npx hardhat verify --network ${hre.network.name} ${factoryAddress}`);
  }

  console.log("\n🎉 Deployment complete!");
  
  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });

