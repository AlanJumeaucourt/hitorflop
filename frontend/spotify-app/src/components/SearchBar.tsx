import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { searchTracks } from '../api/spotify';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const previousQuery = useRef(query);

  useEffect(() => {
    // Don't search if query is less than 3 characters
    if (query.length < 3) {
      return;
    }

    // Don't search if query hasn't changed
    if (query === previousQuery.current) {
      return;
    }

    // Create a debounce timer
    const timer = setTimeout(() => {
      previousQuery.current = query;
      onSearch(query);
    }, 500); // Wait 500ms after user stops typing

    // Cleanup timer on each query change
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full rounded-lg bg-gray-800 pl-10 pr-4 text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Search for a song..."
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-gray-400" />
        )}
      </div>
    </div>
  );
}

export default SearchBar;