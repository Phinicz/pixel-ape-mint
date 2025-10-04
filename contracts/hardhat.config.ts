import * as dotenv from "dotenv"
dotenv.config();
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers";

const { AVALANCHE_RPC_URL } = process.env;

const PRIVATE_KEY = process.env.DEPLOYMENT_ACCOUNT_KEY || "";
const FUJI_RPC_URL = process.env.CHAIN_INSTANCE || "";
const apiKey = process.env.API_KEY || "";

export const solidity = "0.8.15";
export const networks = {
  hardhat: {
    type: "edr-simulated", // Local Hardhat network
  },
  fuji: {
    type: "http",
    url: FUJI_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
    accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    chainId: 43113,
  },
  avalanche: {
    type: "http",
    url: AVALANCHE_RPC_URL || "https://api.avax.network/ext/bc/C/rpc",
    accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    chainId: 43114,
  },
};
export const etherscan = {
  apiKey: {
    avalancheFujiTestnet: apiKey,
    bsc: apiKey || "",
    chaos: "na",
    nebula: "na",
    avalanche: apiKey,
    hatchyverse: "empty",
  },
};
