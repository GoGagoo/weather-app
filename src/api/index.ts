import axios from 'axios'
import { GEOCODING_URL, OPEN_METEO_FORECAST_URL } from '../constants/constants'
import { WeatherApiParams, WeatherData } from '../types/WeatherData'

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

export function fetchCoordinatesApi(city: string) {
	const url = `${GEOCODING_URL}?name=${city}&count=1&language=en`
	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`)
			}
			return res.json()
		})
		.then((data) => {
			return data
		})
}

export function fetchWeatherApi(
	params: WeatherApiParams
): Promise<WeatherData> {
	const { latitude, longitude, unit, timezone } = params
	const url = `${OPEN_METEO_FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,pressure_msl,wind_speed_10m&hourly=temperature_2m,weather_code,visibility&daily=sunrise,sunset&timezone=${
		timezone || 'auto'
	}&temperature_unit=${unit}`

	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				console.error('Weather API error:', res.statusText)
				throw new Error(`HTTP error! status: ${res.status}`)
			}
			return res.json()
		})
		.catch((error) => {
			console.error('Error fetching weather data:', error.message)
			throw error
		})
}

export const fetchWeatherData = async (
  params: WeatherApiParams
): Promise<WeatherData> => {
  const { latitude, longitude, unit, timezone } = params

  try {
    const response = await axios.get(OPEN_METEO_FORECAST_URL, {
      params: {
        latitude,
        longitude,
        temperature_unit: unit,
        timezone: timezone || 'auto',
        current_weather: true,
        current:
          'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,pressure_msl,wind_speed_10m',
        hourly: 'temperature_2m,weather_code,visibility',
        daily: 'sunrise,sunset',
      },
    })
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching weather data:', error.message)
    } else {
      console.error('Error fetching weather data:', error)
    }
    throw new Error('Error fetching weather data')
  }
}
