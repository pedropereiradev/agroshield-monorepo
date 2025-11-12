import {
  OpenMeteoCurrentWeatherClient,
  OpenMeteoForecastClient,
} from '@agroshield/data-access';
import type {
  ForecastRequest,
  ForecastResponse,
  HourlyForecastResponse,
  WeatherRequest,
  WeatherResponse,
} from '../schemas/weather.schema';

export default class WeatherService {
  private currentWeatherClient: OpenMeteoCurrentWeatherClient;
  private forecastClient: OpenMeteoForecastClient;

  constructor() {
    this.currentWeatherClient = new OpenMeteoCurrentWeatherClient();
    this.forecastClient = new OpenMeteoForecastClient();
  }

  /**
   * Get current weather for a location
   * Uses OpenMeteoCurrentWeatherClient from data-access package
   */
  async getCurrentWeather(request: WeatherRequest): Promise<WeatherResponse> {
    try {
      const data = await this.currentWeatherClient.getCurrentWeather({
        latitude: request.latitude,
        longitude: request.longitude,
        timezone: 'America/Sao_Paulo',
      });

      return {
        temperature: data.temperature,
        precipitation: data.precipitation,
        windSpeed: data.windSpeed,
        weatherCode: data.weatherCode,
        humidity: data.humidity,
        timestamp: data.timestamp,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get weather forecast for a location
   * Uses OpenMeteoForecastClient from data-access package
   */
  async getForecast(request: ForecastRequest): Promise<ForecastResponse> {
    try {
      const days = request.days || 14;

      const data = await this.forecastClient.getDailyForecast({
        latitude: request.latitude,
        longitude: request.longitude,
        variables: [
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'weather_code',
        ],
        timezone: 'America/Sao_Paulo',
        forecast_days: days,
      });

      const forecast = data.map((day) => ({
        date: day.date,
        temperatureMax: day.tMax || 0,
        temperatureMin: day.tMin || 0,
        precipitation: day.precip || 0,
        weatherCode: day.weatherCode || 0,
      }));

      return { forecast };
    } catch (error) {
      throw new Error(
        `Failed to fetch forecast data: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get hourly forecast for next 24 hours
   * Uses OpenMeteoForecastClient from data-access package
   */
  async getHourlyForecast(
    request: WeatherRequest
  ): Promise<HourlyForecastResponse> {
    try {
      const data = await this.forecastClient.getHourlyForecast({
        latitude: request.latitude,
        longitude: request.longitude,
        variables: ['temperature_2m', 'precipitation', 'weathercode'],
        timezone: 'America/Sao_Paulo',
        forecast_days: 1, // Next 24 hours
      });

      const hourly = data.map((hour) => ({
        time: hour.time,
        temperature: hour.temperature || 0,
        precipitation: hour.precipitation || 0,
        weatherCode: (hour as any).weathercode || 0,
      }));

      return { hourly };
    } catch (error) {
      throw new Error(
        `Failed to fetch hourly forecast: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
