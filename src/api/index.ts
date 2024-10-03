import axios from 'axios'
import { GEOCODING_URL, OPEN_METEO_FORECAST_URL } from '../constants/constants'
import { WeatherApiParams, WeatherData } from '../types/WeatherData'
import { logError } from '../utils/logError'

const CURRENT_PARAMS =
	'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,pressure_msl,wind_speed_10m'
const HOURLY_PARAMS = 'temperature_2m,weather_code,visibility'
const DAILY_PARAMS = 'sunrise,sunset'

export async function fetchWeatherApi(
	params: WeatherApiParams
): Promise<WeatherData> {
	try {
		const { latitude, longitude, unit, timezone = 'auto' } = params

		const url = `${OPEN_METEO_FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=${CURRENT_PARAMS}&hourly=${HOURLY_PARAMS}&daily=${DAILY_PARAMS}&timezone=${timezone}&temperature_unit=${unit}`

		const { data } = await axios.get<WeatherData>(url)
		return data
	} catch (error) {
		logError('Error fetching coordinates', error)
		throw new Error('Error fetching coordinates')
	}
}

export async function fetchCoordinates(city: string) {
	try {
		const res = await axios.get(GEOCODING_URL, {
			params: {
				name: city,
				count: 1,
				language: 'en',
			},
		})
		return res.data
	} catch (error) {
		logError('Error fetching coordinates', error)
		throw new Error('Error fetching coordinates')
	}
}
