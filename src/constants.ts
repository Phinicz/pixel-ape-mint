import ANONS from "./assets/abi/ANONS.json";
export const ABI = {
  'anons': ANONS.abi
}
import { ContractName, NetworkData } from "../types";

export const env = "dev" // (process.env.NEXT_PUBLIC_ENV || "dev");
export const DefaultChainId = env == "dev" ? 43113 : 43114;

const prodNetworks: Map<number, NetworkData> = new Map([
  [
    43114,
    {
      name: "avalanche",
      label: "Avalanche",
      symbol: "AVAX",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },
      rpc: ["https://api.avax.network/ext/bc/C/rpc"],
      layerzeroId: 106,
      coingeckoId: "avalanche-2",
      chainId: 43114,
      icon: "/icons/networks/avalanche.png",
      availableBridges: {
        token: [56],
      },
      addresses: {
        usdt: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
        anons: ''
      },
    },
  ],
]);

const devNetworks: Map<number, NetworkData> = new Map([
  [
    43113,
    {
      name: "fuji",
      label: "Fuji Testnet",
      layerzeroId: 10106,
      coingeckoId: "avalanche-2",
      chainId: 43113,
      symbol: "AVAX",
      rpc: ["https://api.avax-test.network/ext/bc/C/rpc"],
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },
      icon: "/icons/networks/avalanche.png",
      availableBridges: {
        token: [97, 80001, 4002, 421613],
        omnigens: [4002],
        omnigensItems: [4002],
      },
      addresses: {
        usdt: "0x82DCEC6aa3c8BFE2C96d40d8805EE0dA15708643",
        anons: '0x9fB2c4e3D09d8f3d4550c1A87e24528C09f313dB'
      },
    },
  ],
]);

export const Networks = env == "dev" ? devNetworks : prodNetworks;

export const getAddress = (
  chainId: number | undefined = DefaultChainId,
  contractName: ContractName
) => {
  const networkData = Networks.get(chainId);
  if (!networkData) {
    console.log(`Network ${chainId} is not supported`);
    // return;
    return `0x`;
  }
  const address = networkData.addresses[contractName];
  if (!address) {
    //console.error(`Contract ${contractName} is not deployed on ${chainId}`);
    return `0x`;
  }
  return address as `0x${string}`;
};

export const getContractConfig = (
  contractName: ContractName,
  chainId: number | undefined = DefaultChainId
) => {
  return {
    address: getAddress(chainId, contractName),
    abi: ABI[contractName],
  };
}