import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PriceCard } from "@/components/PriceCard";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

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
    toast({
      title: "Search completed",
      description: "Found matching products for your search.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Card className="container mx-auto px-4 py-16 border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary/60">
              Find the Best Price
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare prices across multiple sellers and find the best deals
            </p>
          </motion.div>

          <div className="mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {searchResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PriceCard {...result} />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;