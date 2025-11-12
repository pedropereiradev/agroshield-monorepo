import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { CityResult } from '@/hooks/useCitySearch';
import { type Location, useBrowserGeolocation } from '@/hooks/useGeolocation';
import { MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CitySearchInput } from './CitySearchInput';

interface LocationSelectorProps {
  currentLocation: Location;
  onLocationChange: (location: Location) => void;
}

export function LocationSelector({
  currentLocation,
  onLocationChange,
}: LocationSelectorProps) {
  const [open, setOpen] = useState(false);
  const { requestLocation, isLoading: isRequestingLocation } =
    useBrowserGeolocation();

  const handleCitySelect = (city: CityResult) => {
    const newLocation: Location = {
      latitude: city.latitude,
      longitude: city.longitude,
      city: city.name,
      region: city.admin1,
      country: city.country,
    };

    onLocationChange(newLocation);
    setOpen(false);

    const cityDisplay = city.admin1
      ? `${city.name}, ${city.admin1}`
      : city.name;
    toast.success(`Localização alterada para ${cityDisplay}`);
  };

  const handleBrowserLocation = async () => {
    requestLocation();

    setTimeout(() => {
      const cachedLocation = localStorage.getItem('user_location');
      if (cachedLocation) {
        const parsed = JSON.parse(cachedLocation);
        onLocationChange(parsed);
        setOpen(false);
        toast.success('Localização obtida com sucesso!');
      }
    }, 2000);
  };

  const locationDisplay = currentLocation.city
    ? `${currentLocation.city}${currentLocation.region ? `, ${currentLocation.region}` : ''}`
    : `${currentLocation.latitude.toFixed(2)}, ${currentLocation.longitude.toFixed(2)}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <MapPin className="h-4 w-4" />
          {locationDisplay}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Alterar Localização</DialogTitle>
          <DialogDescription>
            Busque por uma cidade ou use sua localização atual para ver as
            condições meteorológicas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>Buscar Cidade</Label>
            <CitySearchInput
              onCitySelect={handleCitySelect}
              placeholder="Digite o nome da cidade (ex: São Paulo)"
            />
            <p className="text-xs text-muted-foreground">
              Digite ao menos 2 caracteres para buscar cidades
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                ou
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Localização Precisa</Label>
            <Button
              onClick={handleBrowserLocation}
              disabled={isRequestingLocation}
              className="w-full gap-2"
              variant="outline"
            >
              <Navigation className="h-4 w-4" />
              {isRequestingLocation
                ? 'Obtendo localização...'
                : 'Usar Minha Localização GPS'}
            </Button>
            <p className="text-xs text-muted-foreground">
              Requer permissão do navegador para acessar sua localização GPS
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
