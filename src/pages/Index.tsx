import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PriceCard } from "@/components/PriceCard";
import { motion } from "framer-motion";

const Index = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    // Temporary mock data - will be replaced with actual API calls
    const mockData = {
      productName: "Premium Wireless Headphones",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      sellers: [
        { name: "TechStore", price: 299.99, rating: 4, url: "#" },
        { name: "AudioPro", price: 279.99, rating: 5, url: "#" },
        { name: "SoundGear", price: 289.99, rating: 4, url: "#" },
      ],
    };

    setSearchResults([mockData]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Find the Best Price
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare prices across multiple sellers and find the best deals
          </p>
        </motion.div>

        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((result, index) => (
            <PriceCard key={index} {...result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;