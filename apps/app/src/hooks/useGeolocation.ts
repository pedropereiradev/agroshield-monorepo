import { useEffect, useState } from 'react';

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
  country?: string;
}

interface GeolocationState {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to get user's location from IP address using ipapi.co
 * Free tier: 1000 requests per day, no API key required
 */
export function useIPGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchLocationFromIP = async () => {
      try {
        const cachedLocation = localStorage.getItem('user_location');
        if (cachedLocation) {
          const parsed = JSON.parse(cachedLocation);
          setState({
            location: parsed,
            isLoading: false,
            error: null,
          });
          return;
        }

        const response = await fetch('https://ipapi.co/json/');

        if (!response.ok) {
          throw new Error('Falha ao obter localização');
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.reason || 'Erro na API de geolocalização');
        }

        const location: Location = {
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
          region: data.region,
          country: data.country_name,
        };

        localStorage.setItem('user_location', JSON.stringify(location));

        setState({
          location,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        console.error('Geolocation error:', err);

        const fallbackLocation: Location = {
          latitude: -23.55,
          longitude: -46.63,
          city: 'São Paulo',
          region: 'São Paulo',
          country: 'Brasil',
        };

        setState({
          location: fallbackLocation,
          isLoading: false,
          error:
            err instanceof Error ? err.message : 'Erro ao obter localização',
        });
      }
    };

    fetchLocationFromIP();
  }, []);

  return state;
}

/**
 * Hook to get user's location from browser geolocation API
 * Requires user permission
 */
export function useBrowserGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    isLoading: false,
    error: null,
  });

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        isLoading: false,
        error: 'Geolocalização não suportada pelo navegador',
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        localStorage.setItem('user_location', JSON.stringify(location));

        setState({
          location,
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        setState({
          location: null,
          isLoading: false,
          error: 'Não foi possível obter sua localização',
        });
        console.error('Browser geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return { ...state, requestLocation };
}

/**
 * Update user's location manually
 */
export function updateUserLocation(location: Location) {
  localStorage.setItem('user_location', JSON.stringify(location));
}

/**
 * Clear cached location
 */
export function clearUserLocation() {
  localStorage.removeItem('user_location');
}
