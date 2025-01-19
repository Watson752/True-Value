import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PriceCard } from "@/components/PriceCard";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, History, Star, Sun, Moon } from "lucide-react";

const Index = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("trending");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if dark mode was previously enabled
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    document.documentElement.classList.toggle("dark");
    
    toast({
      title: `${newDarkMode ? "Dark" : "Light"} mode enabled`,
      duration: 1500,
    });
  };

  const handleSearch = async (query: string) => {
    // Temporary mock data with expanded information
    const mockData = [
      {
        productName: "Premium Wireless Headphones",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        sellers: [
          { name: "TechStore", price: 299.99, rating: 4, url: "#" },
          { name: "AudioPro", price: 279.99, rating: 5, url: "#" },
          { name: "SoundGear", price: 289.99, rating: 4, url: "#" },
        ],
      },
      {
        productName: "Smart Watch Pro",
        imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
        sellers: [
          { name: "WatchMaster", price: 399.99, rating: 5, url: "#" },
          { name: "TimeZone", price: 379.99, rating: 4, url: "#" },
          { name: "SmartLife", price: 389.99, rating: 4, url: "#" },
        ],
      },
    ];

    setSearchResults(mockData);
    toast({
      title: "Search completed",
      description: "Found matching products for your search.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-slate-700" />
          )}
        </Button>
      </div>

      <Card className="container mx-auto px-4 py-8 border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary/60 dark:from-purple-400 dark:via-pink-400 dark:to-purple-500">
              Smart Price Compare
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 dark:text-gray-300">
              Find the best deals across multiple sellers with real-time price tracking and analysis
            </p>
            <div className="mb-12 max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </motion.div>

          <Tabs defaultValue="trending" className="w-full max-w-6xl mx-auto mb-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
              <TabsTrigger value="trending" onClick={() => setActiveTab("trending")}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>
                <History className="mr-2 h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="favorites" onClick={() => setActiveTab("favorites")}>
                <Star className="mr-2 h-4 w-4" />
                Favorites
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="trending" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  </div>
                </TabsContent>

                <TabsContent value="recent" className="mt-8">
                  <div className="text-center text-muted-foreground dark:text-gray-400">
                    <p>Your recent searches will appear here</p>
                    <Button variant="outline" className="mt-4">View History</Button>
                  </div>
                </TabsContent>

                <TabsContent value="favorites" className="mt-8">
                  <div className="text-center text-muted-foreground dark:text-gray-400">
                    <p>Your favorite items will appear here</p>
                    <Button variant="outline" className="mt-4">Browse Favorites</Button>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;