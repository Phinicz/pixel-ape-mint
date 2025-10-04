const { ethers, upgrades } = require("hardhat");

async function main() {
  // Replace with your deployed proxy address
  const proxyAddress = "YOUR_DEPLOYED_PROXY_ADDRESS";

  // Compile new contract version (make sure it's updated in contracts/ANONS.sol)
  const ANONSv2 = await ethers.getContractFactory("ANONS");

  // Upgrade the proxy to the new implementation
  const upgraded = await upgrades.upgradeProxy(proxyAddress, ANONSv2);
  await upgraded.waitForDeployment();

  console.log("Proxy upgraded. Address remains:", await upgraded.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
