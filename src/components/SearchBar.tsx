import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-3 shadow-lg border border-input/50 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 dark:bg-gray-800/90 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a product..."
            className="w-full h-12 pl-4 pr-12 text-lg bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/30 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
          <motion.div
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="w-8 h-8 text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setIsListening(!isListening)}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="w-8 h-8 text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
        <Button
          type="submit"
          size="icon"
          className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full dark:bg-primary/80 dark:hover:bg-primary"
        >
          <Search className="w-5 h-5" />
        </Button>
      </form>
    </Card>
  );
};