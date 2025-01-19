import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Bell, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

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
  id?: string;
}

export const PriceCard = ({ sellers, productName, imageUrl, id = "1" }: PriceCardProps) => {
  const lowestPrice = Math.min(...sellers.map(s => s.price));
  const highestPrice = Math.max(...sellers.map(s => s.price));
  const averagePrice = sellers.reduce((acc, s) => acc + s.price, 0) / sellers.length;
  const priceRange = highestPrice - lowestPrice;

  const getPricePosition = (price: number) => {
    if (priceRange === 0) return 50;
    return ((price - lowestPrice) / priceRange) * 100;
  };

  const renderPriceBar = (price: number) => {
    const position = getPricePosition(price);
    
    return (
      <div className="relative w-full h-8 mt-4">
        <div 
          className="absolute w-full h-2 rounded-full"
          style={{
            background: "linear-gradient(to right, #1EAEDB, #33C3F0, #403E43)"
          }}
        />
        
        <div 
          className="absolute w-0.5 h-4 bg-camel-gray dark:bg-white"
          style={{
            left: `${getPricePosition(averagePrice)}%`,
            transform: 'translateX(-50%)',
          }}
        />
        
        <div 
          className="absolute -top-8 transform -translate-x-1/2 bg-white dark:bg-camel-darkCharcoal px-2 py-1 rounded shadow-lg border border-camel-blue/20 dark:border-camel-blue/30"
          style={{
            left: `${position}%`,
          }}
        >
          <span className="font-medium text-camel-gray dark:text-white">${price.toFixed(2)}</span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-camel-darkCharcoal border-r border-b border-camel-blue/20 dark:border-camel-blue/30"></div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-white dark:bg-camel-darkCharcoal backdrop-blur-sm rounded-lg shadow-md border border-camel-blue/20 dark:border-camel-blue/30 overflow-hidden transition-all duration-300 hover:shadow-lg group"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-camel-blue text-white text-sm font-medium rounded-md">
            Best Price: ${lowestPrice}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="secondary" className="w-8 h-8 rounded-md bg-white/90 hover:bg-white dark:bg-camel-darkCharcoal/90 dark:hover:bg-camel-darkCharcoal">
            <Heart className="w-4 h-4 text-camel-gray dark:text-white" />
          </Button>
          <Button size="icon" variant="secondary" className="w-8 h-8 rounded-md bg-white/90 hover:bg-white dark:bg-camel-darkCharcoal/90 dark:hover:bg-camel-darkCharcoal">
            <Share2 className="w-4 h-4 text-camel-gray dark:text-white" />
          </Button>
          <Button size="icon" variant="secondary" className="w-8 h-8 rounded-md bg-white/90 hover:bg-white dark:bg-camel-darkCharcoal/90 dark:hover:bg-camel-darkCharcoal">
            <Bell className="w-4 h-4 text-camel-gray dark:text-white" />
          </Button>
          <Link to={`/price-history/${id}`}>
            <Button size="icon" variant="secondary" className="w-8 h-8 rounded-md bg-white/90 hover:bg-white dark:bg-camel-darkCharcoal/90 dark:hover:bg-camel-darkCharcoal">
              <LineChart className="w-4 h-4 text-camel-gray dark:text-white" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold mb-4 text-camel-gray dark:text-white">{productName}</h3>
        
        <div className="space-y-4">
          {sellers.map((seller, index) => (
            <motion.div
              key={seller.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-2 p-3 rounded-md bg-camel-background dark:bg-camel-gray/10 hover:bg-camel-background/80 dark:hover:bg-camel-gray/20 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-camel-gray dark:text-white">{seller.name}</p>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: seller.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-camel-blue" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-camel-gray dark:text-white">${seller.price}</p>
                  <a
                    href={seller.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-camel-blue hover:text-camel-lightBlue dark:text-camel-lightBlue dark:hover:text-white"
                  >
                    Visit Store
                  </a>
                </div>
              </div>
              {renderPriceBar(seller.price)}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};