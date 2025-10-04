const { upgrades, run } = require("hardhat");

async function main() {
  // Replace with your deployed proxy address
  const proxyAddress = "YOUR_DEPLOYED_PROXY_ADDRESS";

  // Get implementation address
  const implAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  console.log("Implementation address:", implAddress);

  // Verify implementation contract
  await run("verify:verify", {
    address: implAddress,
    constructorArguments: [],
  });

  console.log("Verified implementation contract at:", implAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
