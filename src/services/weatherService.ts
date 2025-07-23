import { WeatherData } from '../types';

export class WeatherService {
  // Mock weather service - in a real app, you'd use OpenWeatherMap or similar
  static async getCurrentWeather(lat?: number, lon?: number): Promise<WeatherData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock weather data based on time of day and random factors
    const hour = new Date().getHours();
    const conditions = ['sunny', 'partly cloudy', 'cloudy', 'light rain', 'clear'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    let temperature = 15 + Math.random() * 20; // 15-35°C
    if (hour < 6 || hour > 20) {
      temperature -= 5; // Cooler at night
    }
    
    return {
      temperature: Math.round(temperature),
      condition: randomCondition,
      humidity: Math.round(40 + Math.random() * 40), // 40-80%
      pressure: Math.round(1000 + Math.random() * 50), // 1000-1050 hPa
      location: 'Current Location',
    };
  }

  static async getWeatherForecast(days: number = 5): Promise<WeatherData[]> {
    const forecast: WeatherData[] = [];
    const baseTemp = 20;
    
    for (let i = 0; i < days; i++) {
      const temp = baseTemp + (Math.random() - 0.5) * 10;
      const conditions = ['sunny', 'partly cloudy', 'cloudy', 'light rain'];
      
      forecast.push({
        temperature: Math.round(temp),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.round(40 + Math.random() * 40),
        pressure: Math.round(1000 + Math.random() * 50),
        location: 'Current Location',
      });
    }
    
    return forecast;
  }
}