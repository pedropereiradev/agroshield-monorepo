import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Location } from '@/hooks/useGeolocation';
import { type DailyForecast, getForecast } from '@/services/weather/api';
import {
  Calendar,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudRain,
  CloudSnow,
  Droplets,
  Sun,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface WeatherForecastProps {
  location: Location;
}

const getWeatherIcon = (code: number, size = 'h-5 w-5') => {
  if (code === 0) return <Sun className={`${size} text-yellow-500`} />;
  if (code <= 3) return <Cloud className={`${size} text-gray-400`} />;
  if (code <= 49) return <CloudFog className={`${size} text-gray-500`} />;
  if (code <= 59) return <CloudDrizzle className={`${size} text-blue-400`} />;
  if (code <= 69) return <CloudRain className={`${size} text-blue-500`} />;
  if (code <= 79) return <CloudSnow className={`${size} text-blue-300`} />;
  if (code <= 99) return <CloudRain className={`${size} text-blue-600`} />;
  return <Cloud className={`${size} text-gray-400`} />;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.getTime() === today.getTime()) {
    return 'Hoje';
  }

  if (date.getTime() === tomorrow.getTime()) {
    return 'Amanhã';
  }

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dayName = dayNames[date.getDay()];
  const day = date.getDate();

  return `${dayName} ${day}`;
};

export function WeatherForecast({ location }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getForecast({
          latitude: location.latitude,
          longitude: location.longitude,
          days: 14,
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredForecast = data.forecast.filter((day) => {
          const forecastDate = new Date(day.date + 'T00:00:00');
          return forecastDate.getTime() >= today.getTime();
        });

        setForecast(filteredForecast);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecast();
  }, [location.latitude, location.longitude]);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4" />
            Previsão 14 Dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">
              Não foi possível carregar a previsão
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Calendar className="h-4 w-4" />
          Previsão 14 Dias
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-2">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-full bg-muted animate-pulse rounded" />
                <div className="h-5 w-5 bg-muted animate-pulse rounded mx-auto" />
                <div className="h-3 w-8 bg-muted animate-pulse rounded mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[repeat(14,minmax(60px,1fr))] md:grid-cols-[repeat(14,1fr)] gap-2 min-w-min">
              {forecast.map((day, index) => {
                const isToday = index === 0;

                return (
                  <div
                    key={day.date}
                    className={`py-2 px-1 rounded-lg text-center transition-all hover:bg-accent ${
                      isToday ? 'bg-primary/10 ring-1 ring-primary/30' : ''
                    }`}
                  >
                    <p
                      className={`text-[12px] font-medium mb-1.5 truncate ${
                        isToday ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {formatDate(day.date)}
                    </p>

                    <div className="flex justify-center mb-1.5">
                      {getWeatherIcon(day.weatherCode, 'h-5 w-5')}
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-xs font-bold">
                        {day.temperatureMax.toFixed(0)}°
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        {day.temperatureMin.toFixed(0)}°
                      </p>
                    </div>

                    {day.precipitation > 0 && (
                      <div className="flex items-center justify-center gap-0.5 mt-1 text-blue-600">
                        <Droplets className="h-2.5 w-2.5" />
                        <span className="text-[10px]">
                          {day.precipitation.toFixed(0)}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
