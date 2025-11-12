import { Input } from '@/components/ui/input';
import {
  type CityResult,
  formatCityDisplay,
  useCitySearch,
} from '@/hooks/useCitySearch';
import { cn } from '@/lib/utils';
import { Loader2, MapPin, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CitySearchInputProps {
  onCitySelect: (city: CityResult) => void;
  placeholder?: string;
}

export function CitySearchInput({
  onCitySelect,
  placeholder = 'Buscar cidade...',
}: CitySearchInputProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { results, isLoading, searchCities, clearResults } = useCitySearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length < 2) {
      clearResults();
      setIsOpen(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      searchCities(value);
      setIsOpen(true);
    }, 300);
  };

  const handleCitySelect = (city: CityResult) => {
    onCitySelect(city);
    setQuery('');
    setIsOpen(false);
    clearResults();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (results.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className="pl-9"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-popover border rounded-md shadow-md max-h-72 overflow-y-auto"
        >
          {results.map((city, index) => (
            <button
              type="button"
              key={`${city.latitude}-${city.longitude}-${index}`}
              onClick={() => handleCitySelect(city)}
              className={cn(
                'w-full px-3 py-2.5 text-left hover:bg-accent transition-colors flex items-start gap-3',
                'border-b last:border-b-0 border-border/50'
              )}
            >
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {formatCityDisplay(city)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && !isLoading && query.length >= 2 && results.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-popover border rounded-md shadow-md p-4"
        >
          <p className="text-sm text-muted-foreground text-center">
            Nenhuma cidade encontrada para "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
