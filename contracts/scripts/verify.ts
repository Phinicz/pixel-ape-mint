import { run, upgrades } from "hardhat";

async function main() {
  // Replace with your deployed proxy address
  const proxyAddress = "0x9fB2c4e3D09d8f3d4550c1A87e24528C09f313dB";

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
