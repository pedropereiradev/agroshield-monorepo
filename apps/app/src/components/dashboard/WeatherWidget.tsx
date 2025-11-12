import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Location } from '@/hooks/useGeolocation';
import { getCurrentWeather, getHourlyForecast } from '@/services/weather/api';
import {
  Clock,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudRain,
  CloudSnow,
  Droplets,
  Sun,
  Wind,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { LocationSelector } from './LocationSelector';

interface WeatherData {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
}

interface HourlyData {
  time: string;
  temperature: number;
  weatherCode: number;
}

interface WeatherWidgetProps {
  location: Location;
  onLocationChange: (location: Location) => void;
}

const getWeatherIcon = (code: number, size = 'h-8 w-8') => {
  if (code === 0) return <Sun className={`${size} text-yellow-500`} />;
  if (code <= 3) return <Cloud className={`${size} text-gray-400`} />;
  if (code <= 49) return <CloudFog className={`${size} text-gray-500`} />;
  if (code <= 59) return <CloudDrizzle className={`${size} text-blue-400`} />;
  if (code <= 69) return <CloudRain className={`${size} text-blue-500`} />;
  if (code <= 79) return <CloudSnow className={`${size} text-blue-300`} />;
  if (code <= 99) return <CloudRain className={`${size} text-blue-600`} />;
  return <Cloud className={`${size} text-gray-400`} />;
};

const getWeatherDescription = (code: number): string => {
  if (code === 0) return 'Céu limpo';
  if (code === 1) return 'Principalmente limpo';
  if (code === 2) return 'Parcialmente nublado';
  if (code === 3) return 'Nublado';
  if (code <= 49) return 'Neblina';
  if (code <= 59) return 'Garoa';
  if (code <= 69) return 'Chuva';
  if (code <= 79) return 'Neve';
  if (code <= 99) return 'Tempestade';
  return 'Desconhecido';
};

export function WeatherWidget({
  location,
  onLocationChange,
}: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const currentData = await getCurrentWeather({
          latitude: location.latitude,
          longitude: location.longitude,
        });

        setWeather({
          temperature: currentData.temperature,
          precipitation: currentData.precipitation,
          windSpeed: currentData.windSpeed,
          weatherCode: currentData.weatherCode,
          humidity: currentData.humidity,
        });

        try {
          const hourlyData = await getHourlyForecast({
            latitude: location.latitude,
            longitude: location.longitude,
          });

          const now = new Date();
          const nextHours: HourlyData[] = [];

          // Get next 6 hours
          for (
            let i = 0;
            i < hourlyData.hourly.length && nextHours.length < 6;
            i++
          ) {
            const hour = hourlyData.hourly[i];
            const forecastTime = new Date(hour.time);
            if (forecastTime > now) {
              nextHours.push({
                time: hour.time,
                temperature: hour.temperature,
                weatherCode: hour.weatherCode,
              });
            }
          }

          setHourlyForecast(nextHours);
        } catch (err) {
          console.error('Failed to fetch hourly forecast:', err);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location.latitude, location.longitude]);

  if (error) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Condições Meteorológicas
            </CardTitle>
            <LocationSelector
              currentLocation={location}
              onLocationChange={onLocationChange}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">
              Não foi possível carregar dados meteorológicos
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Condições Meteorológicas
          </CardTitle>
          <LocationSelector
            currentLocation={location}
            onLocationChange={onLocationChange}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        ) : weather ? (
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weather.weatherCode)}
              <div>
                <p className="text-3xl font-bold">
                  {weather.temperature.toFixed(1)}°C
                </p>
                <p className="text-sm text-muted-foreground">
                  {getWeatherDescription(weather.weatherCode)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Precipitação</p>
                  <p className="text-sm font-semibold">
                    {weather.precipitation.toFixed(1)} mm
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Wind className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Vento</p>
                  <p className="text-sm font-semibold">
                    {weather.windSpeed.toFixed(1)} m/s
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Droplets className="h-5 w-5 text-cyan-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Umidade</p>
                  <p className="text-sm font-semibold">{weather.humidity}%</p>
                </div>
              </div>
            </div>

            {hourlyForecast.length > 0 && (
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">
                    Próximas Horas
                  </p>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {hourlyForecast.map((hour, index) => {
                    const time = new Date(hour.time);
                    const hourStr =
                      time.getHours().toString().padStart(2, '0') + ':00';

                    return (
                      <div
                        key={hour.time}
                        className="flex-shrink-0 text-center p-2 rounded-lg hover:bg-accent transition-colors"
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          {hourStr}
                        </p>
                        <div className="flex justify-center mb-1">
                          {getWeatherIcon(hour.weatherCode, 'h-5 w-5')}
                        </div>
                        <p className="text-sm font-semibold">
                          {hour.temperature.toFixed(0)}°
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
