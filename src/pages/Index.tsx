import { useState } from 'react';
import { WalletConnection } from '@/components/WalletConnection';
import { MintSection } from '@/components/MintSection';
import { CollectionsGrid } from '@/components/CollectionsGrid';
import { Footer } from '@/components/Footer';

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

  const handleConnectWallet = () => {
    // This will trigger the wallet connection component
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
          <h1 className="anons-title mb-8">
            ANONS
          </h1>
          <div className="absolute top-4 right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <div className="text-white text-2xl">💀</div>
            </div>
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