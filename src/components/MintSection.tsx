import { useState } from 'react';
import { useAccount, useConnect, useReadContract, useWriteContract } from "wagmi";
import { useToast } from '@/hooks/use-toast';
import roughDraftApe from '@/assets/apes/rough-draft-ape-1.png';
import { getContractConfig } from '@/constants';

interface MintSectionProps {
  connected: boolean;
  onConnectWallet: () => void;
}

export const MintSection: React.FC<MintSectionProps> = ({ connected, onConnectWallet }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const { toast } = useToast();
  const { connectors, connect } = useConnect()
  const { address, chainId } = useAccount()
  
  // const maxSupply = 4444;
  // const currentSupply = 3333;

  const anonsConfig = getContractConfig('anons')
  const { data: maxSupply} = useReadContract({
    abi: anonsConfig.abi,
    address: anonsConfig.address,
    functionName: 'MAX_SUPPLY',
    args: [],
  }) as { data: bigint};

  const { data: currentSupply} = useReadContract({
    ...anonsConfig,
    functionName: 'totalSupply',
    args: [],
  }) as { data: bigint};

  const mintPrice = 0.025; // ETH
  const progressPercentage = Number(currentSupply) / Number(maxSupply) * 100;
  
  // Number(currentSupply)}/{Number(maxSupply)
  const { data: mintHash, writeContractAsync: mint, isPending: loadingMint} = useWriteContract();
  
  const handleConnectWagmi = () => {
    console.log(connectors);
    
    try {
      connect({ connector: connectors[0] });
    } catch (error) {
      console.log(error);
    }
  }

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
      /*
        const success = await mint({
          ...anonsConfig,
          functionName: 'mint',
          args: [transferAddress, parseUnits(transferAmount, 18)],
          gas: BigInt(1000000),
          value: parseEther((mintPrice * mintAmount).toString()),
        })
      */
      
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
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-red-500">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">▲</span>
            </div>
            <h2 className="text-4xl font-black text-white">MINT</h2>
          </div>
          
          <p className="text-gray-300 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="text-center">
              <div className="mint-button text-black cursor-pointer inline-block">
                MINT PRICE
                <div className="text-sm font-normal">5 AVAX</div>
              </div>
            </div>
            <div className="text-center">
              <div className="mint-button text-black cursor-pointer inline-block">
                SUPPLY
                <div className="text-sm font-normal">{Number(maxSupply)}</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Progress</span>
              <span className="text-white font-bold">{Number(currentSupply)}/{Number(maxSupply)}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {connected ? (
            <button className="mint-button w-full text-black">
              MINT NOW
            </button>
          ) : (
            <button 
              onClick={handleConnectWagmi}
              className="mint-button w-full text-black"
            >
              CONNECT WALLET
            </button>
          )}
        </div>
      </div>
    </div>
  );
};