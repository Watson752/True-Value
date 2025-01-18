import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a product..."
          className="w-full h-12 pl-4 pr-12 text-lg bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 w-8 h-8 bg-primary hover:bg-primary/90 text-white rounded-full shadow-md transition-all duration-300"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};