import axios from 'axios'
import { BASE_URL, WEATHER_API_KEY } from '../constants/constants'

const api = axios.create({
	baseURL: BASE_URL,
	params: {
		units: 'metric',
		lang: 'en',
	},
})

export const getWeatherData = async (city: string) => {
	try {
		const { data } = await axios.get(
			`${BASE_URL}/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
		)
		return data
	} catch (error) {
		console.log('Error: ', error)
		return null
	}
}
