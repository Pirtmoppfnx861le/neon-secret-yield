const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying NeonSecretYield contract...");

  // Get the contract factory
  const NeonSecretYield = await ethers.getContractFactory("NeonSecretYield");

  // Set deployment parameters
  const verifier = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual verifier address
  const treasury = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual treasury address

  // Deploy the contract
  const neonSecretYield = await NeonSecretYield.deploy(verifier, treasury);

  await neonSecretYield.waitForDeployment();

  const contractAddress = await neonSecretYield.getAddress();
  console.log("NeonSecretYield deployed to:", contractAddress);

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    verifier: verifier,
    treasury: treasury,
    deployedAt: new Date().toISOString(),
    network: "sepolia", // Change based on your network
    blockNumber: await ethers.provider.getBlockNumber()
  };

  const fs = require('fs');
  fs.writeFileSync(
    'deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
