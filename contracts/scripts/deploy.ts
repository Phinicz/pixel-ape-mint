import { ethers, upgrades } from "hardhat";

async function main() {
  // Contract constructor args
  const merkleRoot = "0x13e38abb96432d108241412b3647b67da069a6081d7d63351987e5bb4a4e8b12"
  const name = "ANONS";
  const symbol = "ANONS";
  const initialMintPrice = ethers.utils.parseEther("5"); // 5 AVAX
  const initialMaxPerWallet = 10;
  const initialBaseURI = "ipfs://anons/";

  // Deploy proxy
  const ANONS = await ethers.getContractFactory("ANONS");
  const anons = ANONS.attach("0xC1fF3308459D7CF4F5CdF50a8d1F97A142088536");
  await anons.setMerkleRoot(merkleRoot);

  /*
  const anons = await upgrades.deployProxy(
    ANONS,
    [merkleRoot, name, symbol, initialMintPrice, initialMaxPerWallet, initialBaseURI],
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
