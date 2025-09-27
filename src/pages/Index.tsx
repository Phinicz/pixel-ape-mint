import { useState } from 'react';
import { WalletConnection } from '@/components/WalletConnection';
import { MintSection } from '@/components/MintSection';
import { CollectionsGrid } from '@/components/CollectionsGrid';
import { Footer } from '@/components/Footer';
import anonsLogo from '@/assets/anons-logo.png';

const Index = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();

  const handleWalletConnect = (address: string) => {
    setWalletConnected(true);
    setWalletAddress(address);
  };

  const handleWalletDisconnect = () => {
    setWalletConnected(false);
    setWalletAddress(undefined);
  };

  const handleConnectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to connect your wallet');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
      }

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
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black text-foreground">ANONS</div>
          <WalletConnection
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
            connected={walletConnected}
            address={walletAddress}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <img 
              src={anonsLogo} 
              alt="ANONS" 
              className="mx-auto max-w-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Mint Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <MintSection 
            connected={walletConnected}
            onConnectWallet={handleConnectWallet}
          />
        </div>
      </section>

      {/* Collections Section */}
      <CollectionsGrid />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;