import axios from 'axios'
import { OPEN_METEO_FORECAST_URL } from '../constants/constants'
import { WeatherData } from '../types/WeatherData'

export const getWeatherData = async (
	latitude: number,
	longitude: number
): Promise<WeatherData> => {
	try {
		const response = await axios.get(OPEN_METEO_FORECAST_URL, {
			params: {
				latitude,
				longitude,
				current_weather: true,
				current:
					'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,pressure_msl,wind_speed_10m',
				hourly: 'temperature_2m,visibility,weather_code',
				daily: 'sunrise,sunset',
				timezone: 'auto',
			},
		})
		return response.data
	} catch (error) {
		throw new Error('Error fetching weather data')
	}
}
