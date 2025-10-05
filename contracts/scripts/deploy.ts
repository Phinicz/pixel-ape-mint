import { ethers, upgrades } from "hardhat";

async function main() {
  // Contract constructor args
  const name = "ANONS";
  const symbol = "ANONS";
  const initialMintPrice = ethers.utils.parseEther("5"); // 5 AVAX
  const initialMaxPerWallet = 100;
  const initialBaseURI = "ipfs://anons/";

  // Deploy proxy
  const ANONS = await ethers.getContractFactory("ANONS");
  const anons = ANONS.attach("0x9fB2c4e3D09d8f3d4550c1A87e24528C09f313dB");
  await anons.setMintPrice(ethers.utils.parseEther("0.025"));

  /*
  const anons = await upgrades.deployProxy(
    ANONS,
    [name, symbol, initialMintPrice, initialMaxPerWallet, initialBaseURI],
    { initializer: "initialize" }
  );
  await anons.deployed();

  const proxyAddress = anons.address;
  console.log("ANONS proxy deployed to:", proxyAddress);
  // Optionally verify after deployment (wait a few blocks first)
  // await run("verify:verify", { address: proxyAddress });

  // If you want to print the implementation address:
  const implAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  console.log("Implementation address:", implAddress);
  */
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
