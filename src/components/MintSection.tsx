import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import roughDraftApe from '@/assets/apes/rough-draft-ape-1.png';

interface MintSectionProps {
  connected: boolean;
  onConnectWallet: () => void;
}

export const MintSection: React.FC<MintSectionProps> = ({ connected, onConnectWallet }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const { toast } = useToast();
  
  const maxSupply = 4444;
  const currentSupply = 3333;
  const mintPrice = 0.025; // ETH
  const progressPercentage = (currentSupply / maxSupply) * 100;

  const handleMint = async () => {
    if (!connected) {
      onConnectWallet();
      return;
    }

    setIsMinting(true);
    
    // Simulate minting process
    try {
      toast({
        title: "Minting in progress...",
        description: `Minting ${mintAmount} ANONS NFT${mintAmount > 1 ? 's' : ''}`,
      });
      
      // In a real implementation, this would call your smart contract
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Mint successful! 🎉",
        description: `Successfully minted ${mintAmount} ANONS NFT${mintAmount > 1 ? 's' : ''}`,
      });
    } catch (error) {
      toast({
        title: "Mint failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      {/* Left side - Featured NFT */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          <img 
            src={roughDraftApe} 
            alt="Featured ANONS NFT" 
            className="relative w-80 h-80 object-cover rounded-2xl border-4 border-red-500 shadow-2xl"
          />
        </div>
      </div>

      {/* Right side - Mint Interface */}
      <div className="space-y-6">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
            <h2 className="text-3xl font-black text-foreground">MINT</h2>
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA UT ENIM AD MINIM VENIAM QUIS NOSTRUD
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-2xl font-bold text-red-500">{mintPrice} ETH</div>
              <div className="text-sm text-muted-foreground">MINT PRICE</div>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-2xl font-bold text-green-500">{maxSupply - currentSupply}</div>
              <div className="text-sm text-muted-foreground">SUPPLY</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">Progress</span>
              <span className="text-sm text-muted-foreground">{currentSupply}/{maxSupply}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Input
              type="number"
              min="1"
              max="10"
              value={mintAmount}
              onChange={(e) => setMintAmount(Number(e.target.value))}
              className="w-20 text-center font-bold"
            />
            <Button
              onClick={handleMint}
              disabled={isMinting}
              className="mint-button flex-1"
            >
              {isMinting ? 'MINTING...' : connected ? `MINT ${mintAmount}` : 'CONNECT WALLET'}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Total: {(mintPrice * mintAmount).toFixed(3)} ETH + gas
          </div>
        </div>
      </div>
    </div>
  );
};