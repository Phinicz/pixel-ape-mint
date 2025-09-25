import roughDraftApe from '@/assets/apes/rough-draft-ape-1.png';
import trippyDrippy from '@/assets/apes/trippy-drippy-1.png';
import drippingSeeThrough from '@/assets/apes/dripping-see-through-ape-11.png';
import fireApe2 from '@/assets/apes/fire-ape-2.png';
import fireApe4 from '@/assets/apes/fire-ape-4.png';
import fireApe5 from '@/assets/apes/fire-ape-5.png';
import img2138 from '@/assets/apes/img-2138.png';
import pixelApe2 from '@/assets/apes/pixel-ape-2.png';
import pixelApe3 from '@/assets/apes/pixel-ape-3.png';

const nftCollection = [
  { id: 1, image: trippyDrippy, name: "Trippy Drippy #1" },
  { id: 2, image: fireApe5, name: "Fire Ape #5" },
  { id: 3, image: img2138, name: "Dripping Ape #2138" },
  { id: 4, image: fireApe2, name: "Fire Ape #2" },
  { id: 5, image: pixelApe2, name: "Pixel Ape #2" },
  { id: 6, image: fireApe4, name: "Fire Ape #4" },
  { id: 7, image: drippingSeeThrough, name: "See Through #11" },
  { id: 8, image: fireApe5, name: "Fire Ape #5" },
  { id: 9, image: pixelApe3, name: "Pixel Ape #3" },
  { id: 10, image: roughDraftApe, name: "Rough Draft #1" },
];

export const CollectionsGrid = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-foreground mb-6">COLLECTIONS</h2>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all">
              ANONYMOUS
            </button>
            <button className="px-6 py-2 bg-secondary text-muted-foreground rounded-full font-bold hover:bg-muted transition-all">
              COLLECTIONS
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {nftCollection.map((nft) => (
            <div key={nft.id} className="nft-card group">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  {nft.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};