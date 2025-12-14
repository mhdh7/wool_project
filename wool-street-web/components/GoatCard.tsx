import { useState } from 'react';

// Gambar Kambing Default (Placeholder yang ganteng)
const DEFAULT_GOAT = "https://img.freepik.com/premium-vector/pixel-art-goat-standing-grass-sky-background_108855-3255.jpg?w=740";

export function GoatCard({ tokenId, name, value, accessories, imageUrl }: any) {
  // State buat nanganin gambar error
  const [imgSrc, setImgSrc] = useState(
    imageUrl && imageUrl.startsWith("http") ? imageUrl : DEFAULT_GOAT
  );

  return (
    <div className="relative group w-full max-w-sm">
      {/* EFEK GLOW DI BELAKANG (Biar menyala abangkuh 🔥) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      
      {/* KARTU UTAMA */}
      <div className="relative p-6 bg-gray-900 ring-1 ring-gray-800 shadow-2xl rounded-xl">
        
        {/* FRAME GAMBAR */}
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-purple-500 transition-colors">
           
           <img 
             src={imgSrc}
             alt="Goat" 
             // KALAU LINK MATI, GANTI KE DEFAULT GOAT
             onError={() => setImgSrc(DEFAULT_GOAT)}
             className="object-cover w-full h-full transform transition-transform group-hover:scale-110 duration-500"
           />

           {/* Badge Genesis */}
           <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
             ✨ GENESIS
           </div>
        </div>

        {/* INFO KAMBING */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white tracking-wide">{name}</h3>
            <span className="text-gray-500 text-xs font-mono bg-gray-800 px-2 py-1 rounded">
              {tokenId.slice(0,6)}...{tokenId.slice(-4)}
            </span>
          </div>
          
          <div className="flex justify-between items-center bg-gray-800/50 p-2 rounded-lg">
            <span className="text-gray-400 text-xs uppercase">Value</span>
            <span className="text-green-400 font-bold font-mono text-lg">{value} IOTA</span>
          </div>

          {/* AKSESORIS LIST */}
          <div className="pt-3">
            <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider font-bold">Equipped Items</p>
            <div className="flex flex-wrap gap-2">
              {accessories && accessories.length > 0 ? (
                accessories.map((item: string, idx: number) => (
                  <span key={idx} className="bg-purple-500/10 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-gray-600 text-xs italic">Masih polosan bos...</span>
              )}
            </div>
          </div>
        </div>
        
        {/* TOMBOL ACTION */}
        <a 
          href={`https://explorer.rebased.iota.org/object/${tokenId}?network=testnet`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-6 block w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all text-center shadow-lg hover:shadow-white/20 transform hover:-translate-y-1"
        >
          View on Explorer ↗
        </a>
      </div>
    </div>
  );
}
