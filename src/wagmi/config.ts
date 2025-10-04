import { http, createConfig } from 'wagmi'
import { avalanche, avalancheFuji } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [
    //avalanche,
    avalancheFuji
  ],
  connectors: [
    metaMask(),
    injected(),
  ],
  transports: {
    //[avalanche.id]: http(),
    [avalancheFuji.id]: http(),
  },
})