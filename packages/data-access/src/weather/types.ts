export interface CreateWeatherDataPayload {
  locationId: string;
  weatherDataParams: {
    day: Date;
    precipitationSum?: number;
    precipitationHours?: number;
    temp2mMax?: number;
    temp2mMin?: number;
    windSpeed10mMax?: number;
    windGusts10mMax?: number;
    weatherCode?: number;
    shortwaveRadiation?: number;
    et0Fao?: number;
  };
}
