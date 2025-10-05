import { Button } from '@/components/ui/button';
import { DefaultChainId } from '@/constants';
import { useAccount, useConnect, useDisconnect } from 'wagmi';


export const WalletConnection: React.FC = () => {
  const { connectors, connect, isPending: isConnecting } = useConnect()
  const {disconnect} = useDisconnect()
  const { address, chainId, status } = useAccount()
  const connected = status === 'connected';

  const connectWallet = () => {
    try {
      connect({
        connector: connectors[0],
        chainId: DefaultChainId, // Avalanche C-Chain Mainnet
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDisconnect = () => {
    try {
      disconnect();
    } catch (error) {
      console.log(error);
    }
  };

  /*
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsConnecting(true);
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          // Ensure Avalanche C-Chain
          const targetChainId = '0xa86a'; // Avalanche C-Chain Mainnet
          const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (currentChainId !== targetChainId) {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: targetChainId }],
              });
            } catch (switchError: any) {
              if (switchError.code === 4902) {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: targetChainId,
                    chainName: 'Avalanche C-Chain',
                    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
                    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
                    blockExplorerUrls: ['https://snowtrace.io'],
                  }],
                });
              } else {
                throw switchError;
              }
            }
          }
          onConnect(accounts[0]);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert('Please install MetaMask to connect your wallet');
    }
  };
  */

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (connected && address) {
    return (
      <Button 
        onClick={onDisconnect}
        variant="outline"
        className="font-bold"
      >
        {formatAddress(address)}
      </Button>
    );
  }

  return (
    <Button 
      onClick={connectWallet}
      disabled={isConnecting}
      className="mint-button"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};