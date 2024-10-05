import { useEffect, useState } from 'react'
import { getWeatherData } from '../api'
import { Spinner } from '../uikit'
import { WeatherDetails } from './WeatherDetails'
import { WeatherDisplay } from './WeatherDisplay'

export const WeatherInfo = () => {
	const [weatherData, setWeatherData] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchWeather = async () => {
			const data = await getWeatherData('Moscow')
			setWeatherData(data)
			setLoading(false)
		}
		fetchWeather()
	}, [])

	if (loading) return <Spinner />

	if (!weatherData) return <p>Error loading weather data</p>

	return (
		<>
			<WeatherDisplay data={weatherData} />
			<WeatherDetails data={weatherData} />
		</>
	)
}
