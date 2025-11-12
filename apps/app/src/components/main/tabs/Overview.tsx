import { PortfolioMetrics } from '@/components/dashboard/PortfolioMetrics';
import { WeatherForecast } from '@/components/dashboard/WeatherForecast';
import { WeatherWidget } from '@/components/dashboard/WeatherWidget';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type Location,
  updateUserLocation,
  useIPGeolocation,
} from '@/hooks/useGeolocation';
import { Shield } from 'lucide-react';
import { useState } from 'react';

export function Overview() {
  const { location: ipLocation, isLoading: isLoadingLocation } =
    useIPGeolocation();

  const [currentLocation, setCurrentLocation] = useState<Location | null>(
    ipLocation
  );

  if (ipLocation && !currentLocation) {
    setCurrentLocation(ipLocation);
  }

  const handleLocationChange = (newLocation: Location) => {
    setCurrentLocation(newLocation);
    updateUserLocation(newLocation);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Visão Geral
        </h2>
        <p className="text-muted-foreground">
          Dashboard com resumo das suas apólices e condições meteorológicas
        </p>
      </div>

      <PortfolioMetrics />

      {currentLocation && !isLoadingLocation ? (
        <>
          <WeatherWidget
            location={currentLocation}
            onLocationChange={handleLocationChange}
          />

          <WeatherForecast location={currentLocation} />
        </>
      ) : (
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Condições Meteorológicas
            </CardTitle>
            <CardDescription>Obtendo sua localização...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
