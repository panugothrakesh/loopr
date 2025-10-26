const hre = require("hardhat");

/**
 * This script demonstrates how to:
 * 1. Deploy NftSignFactory
 * 2. Use the factory to deploy an NftSign contract instance
 */
async function main() {
  console.log("Starting example deployment to", hre.network.name);
  
  // Get accounts
  const [deployer, signer] = await hre.ethers.getSigners();
  console.log("Deployer account:", deployer.address);
  console.log("Example signer account:", signer.address);

  // Deploy Factory
  console.log("\n📝 Deploying NftSignFactory...");
  const NftSignFactory = await hre.ethers.getContractFactory("NftSignFactory");
  const factory = await NftSignFactory.deploy();
  await factory.waitForDeployment();
  
  const factoryAddress = await factory.getAddress();
  console.log("✅ NftSignFactory deployed to:", factoryAddress);

  // Deploy an NftSign instance via factory
  console.log("\n📝 Deploying NftSign instance via factory...");
  const tx = await factory.deployNftSign(
    "example-document.pdf",                           // _fileName
    "My Important Document",                          // _documentTitle
    "This is a test document for signing",            // _documentDescription
    signer.address,                                   // _intendedSigner
    "QmExampleIPFSHashForDocument123456789"          // _documentContentHash
  );
  
  const receipt = await tx.wait();
  
  // Get the deployed contract address from the event
  const event = receipt.logs.find(
    log => {
      try {
        const parsed = factory.interface.parseLog(log);
        return parsed && parsed.name === "NftSignDeployed";
      } catch {
        return false;
      }
    }
  );
  
  const nftSignAddress = event ? factory.interface.parseLog(event).args.contractAddress : null;
  
  console.log("✅ NftSign instance deployed to:", nftSignAddress);

  // Verify we can read from the deployed contract
  const NftSign = await hre.ethers.getContractFactory("NftSign");
  const nftSign = NftSign.attach(nftSignAddress);
  
  console.log("\n📄 Contract Details:");
  console.log("  File Name:", await nftSign.fileName());
  console.log("  Document Title:", await nftSign.documentTitle());
  console.log("  Intended Signer:", await nftSign.intendedSigner());
  console.log("  Signed:", await nftSign.signed());

  const deploymentInfo = {
    network: hre.network.name,
    factoryAddress: factoryAddress,
    nftSignAddress: nftSignAddress,
    deployer: deployer.address,
    intendedSigner: signer.address,
    timestamp: new Date().toISOString(),
  };

  console.log("\n📋 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("\n🔍 Verify with:");
    console.log(`npx hardhat verify --network ${hre.network.name} ${factoryAddress}`);
  }

  console.log("\n🎉 Example deployment complete!");
  
  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });

