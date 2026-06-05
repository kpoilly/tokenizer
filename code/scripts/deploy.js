const hre = require("hardhat");

// Script de deploiement du token Agent42 sur la blockchain
//
// Usage :
//   npx hardhat run scripts/deploy.js --network bscTestnet

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploiement avec le compte :", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(
    "Balance du compte :",
    hre.ethers.formatEther(balance),
    "BNB"
  );

  // Deployer le contrat
  const Agent42 = await hre.ethers.getContractFactory("Agent42");
  const token = await Agent42.deploy();
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("Agent42 deploye a l'adresse :", address);
  console.log("");
  console.log("Verifiez sur BSCScan :");
  console.log(`https://testnet.bscscan.com/address/${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
