import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-2 shadow-lg border border-input/50">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a product..."
          className="w-full h-12 pl-4 pr-12 text-lg bg-background border-none focus-visible:ring-1 focus-visible:ring-primary/30"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 w-8 h-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
};