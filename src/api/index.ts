import axios from 'axios'

export const getWeatherData = async (latitude: number, longitude: number) => {
	try {
		const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
			params: {
				latitude,
				longitude,
				current_weather: true,
				current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,pressure_msl,wind_speed_10m',
				hourly: 'temperature_2m,visibility',
				daily: 'sunrise,sunset',
				timezone: 'auto',
			},
		})
		return response.data
	} catch (error) {
		console.error('Error fetching weather data:', error)
		return null
	}
}
