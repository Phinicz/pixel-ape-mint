export type Network =
  | "avalanche"
  | "fuji"

export type ContractName =
  | "anons"

export type NetworkData = {
  name: Network;
  label: string;
  layerzeroId: number;
  coingeckoId: string;
  chainId: number;
  icon: string;
  symbol: string;
  rpc: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  availableBridges: {
    token: number[];
  };
  addresses: Partial<Record<ContractName, string>>;
};