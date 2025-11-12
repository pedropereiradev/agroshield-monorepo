import api from '../config/api';

export interface WeatherData {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
  timestamp: string;
}

export interface WeatherRequest {
  latitude: number;
  longitude: number;
}

export interface DailyForecast {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  weatherCode: number;
}

export interface ForecastRequest {
  latitude: number;
  longitude: number;
  days?: number;
}

export interface ForecastResponse {
  forecast: DailyForecast[];
}

/**
 * Fetch current weather data from API server
 */
export const getCurrentWeather = async (
  request: WeatherRequest
): Promise<WeatherData> => {
  try {
    const response = await api.get<WeatherData>('/weather/current', {
      params: {
        latitude: request.latitude,
        longitude: request.longitude,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch weather: ${error.response?.data?.error || error.message}`
    );
  }
};

/**
 * Fetch weather forecast from API server
 */
export const getForecast = async (
  request: ForecastRequest
): Promise<ForecastResponse> => {
  try {
    const response = await api.get<ForecastResponse>('/weather/forecast', {
      params: {
        latitude: request.latitude,
        longitude: request.longitude,
        days: request.days || 14,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch forecast: ${error.response?.data?.error || error.message}`
    );
  }
};

export interface HourlyForecast {
  time: string;
  temperature: number;
  precipitation: number;
  weatherCode: number;
}

export interface HourlyForecastResponse {
  hourly: HourlyForecast[];
}

/**
 * Fetch hourly weather forecast from API server
 */
export const getHourlyForecast = async (
  request: WeatherRequest
): Promise<HourlyForecastResponse> => {
  try {
    const response = await api.get<HourlyForecastResponse>('/weather/hourly', {
      params: {
        latitude: request.latitude,
        longitude: request.longitude,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch hourly forecast: ${error.response?.data?.error || error.message}`
    );
  }
};
