import anonsLogo from '@/assets/anons-logo.png';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <img 
              src={anonsLogo} 
              alt="ANONS" 
              className="h-16 w-auto"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              ANONS ARE A NFT COLLECTION DERIVED FROM CRYPTO AND STREET CULTURE. 
              CONNECTING PEOPLE ALL OVER THE WORLD FROM STREET ART CULTURE.
            </p>
          </div>
          
          {/* Marketplace Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">MARKETPLACE</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">EXPLORE</p>
              <p className="text-sm text-muted-foreground">HOW IT WORKS</p>
              <p className="text-sm text-muted-foreground">HELP</p>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">LINKS</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">TOKENS</p>
              <p className="text-sm text-muted-foreground">API</p>
              <p className="text-sm text-muted-foreground">BIG TOKENS</p>
              <p className="text-sm text-muted-foreground">BECOME PARTNERS</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};