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
    <Card className="w-full max-w-2xl mx-auto p-3 shadow-md border border-camel-blue/20 bg-white dark:bg-camel-darkCharcoal dark:border-camel-blue/30">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a product..."
            className="w-full h-12 pl-4 pr-12 text-lg bg-transparent border-none focus-visible:ring-1 focus-visible:ring-camel-blue dark:text-white dark:placeholder:text-camel-lightGray"
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
              className="w-8 h-8 text-camel-lightGray hover:text-camel-blue dark:text-camel-lightGray dark:hover:text-white"
              onClick={() => setIsListening(!isListening)}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="w-8 h-8 text-camel-lightGray hover:text-camel-blue dark:text-camel-lightGray dark:hover:text-white"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
        <Button
          type="submit"
          size="icon"
          className="w-12 h-12 bg-camel-blue hover:bg-camel-lightBlue text-white rounded-md dark:bg-camel-blue/90 dark:hover:bg-camel-blue"
        >
          <Search className="w-5 h-5" />
        </Button>
      </form>
    </Card>
  );
};