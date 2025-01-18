import { motion } from "framer-motion";

interface Seller {
  name: string;
  price: number;
  rating: number;
  url: string;
}

interface PriceCardProps {
  sellers: Seller[];
  productName: string;
  imageUrl: string;
}

export const PriceCard = ({ sellers, productName, imageUrl }: PriceCardProps) => {
  const lowestPrice = Math.min(...sellers.map(s => s.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
            Best Price: ${lowestPrice}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-4">{productName}</h3>
        
        <div className="space-y-4">
          {sellers.map((seller, index) => (
            <motion.div
              key={seller.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary"
            >
              <div>
                <p className="font-medium">{seller.name}</p>
                <div className="flex items-center mt-1">
                  {Array.from({ length: seller.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${seller.price}</p>
                <a
                  href={seller.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Visit Store
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};