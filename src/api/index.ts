import axios from 'axios'
import { BASE_URL, WEATHER_API_KEY } from '../constants/constants'

export const api = axios.create({
	baseURL: BASE_URL,
	params: {
		lang: 'en',
	},
})

export const getWeatherData = async (
	city: string,
	units: string = 'metric'
) => {
	try {
		const { data } = await axios.get(`${BASE_URL}/weather`, {
			params: {
				q: city,
				units,
				appid: WEATHER_API_KEY,
			},
		})
		return data
	} catch (error) {
		console.log('Error: ', error)
		return null
	}
}
