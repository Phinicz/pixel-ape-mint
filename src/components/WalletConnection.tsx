import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletConnectionProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
  connected: boolean;
  address?: string;
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({
  onConnect,
  onDisconnect,
  connected,
  address
}) => {
  const [isConnecting, setIsConnecting] = useState(false);

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