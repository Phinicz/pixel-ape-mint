export const Footer = () => {
  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-black text-foreground mb-4">ANONS</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              ANONS ARE NOT JUST NFT COLLECTION FOREVER COMMUNITY, FOREVER TEAM. EVERYTHING WILL HAPPEN ANONYMOUS. THE CREATORS WILL ALWAYS BE UNKNOWN AND WILL NEVER BE REVEALED.
            </p>
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-muted-foreground"></div>
              ))}
            </div>
          </div>

          {/* Marketplace Section */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-4">MARKETPLACE</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-red-500 transition-colors">EXPLORE</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">HOW IT WORKS</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">HELP</a></li>
            </ul>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-4">LINKS</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-red-500 transition-colors">TWITTER</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">DISCORD</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">BECOME FEATURES</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 ANONS. All rights reserved. Stay Anonymous.</p>
        </div>
      </div>
    </footer>
  );
};