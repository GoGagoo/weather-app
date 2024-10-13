import { useEffect, useState } from 'react'
import { getWeatherData } from '../api'
import { Loader } from '../uikit'
import { NotFound } from './NotFound'
import { WeatherDetails } from './WeatherDetails'
import { WeatherDisplay } from './WeatherDisplay'

interface Props {
	unit: string
}

export const WeatherInfo: React.FC<Props> = ({ unit }) => {
	const [weatherData, setWeatherData] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchWeather = async () => {
			setLoading(true)
			const data = await getWeatherData('Moscow', unit)
			setWeatherData(data)
			setLoading(false)
		}
		fetchWeather()
	}, [unit])

	if (loading) return <Loader />

	if (!weatherData) return <NotFound />

	return (
		<>
			<WeatherDisplay data={weatherData} unit={unit} />
			<WeatherDetails data={weatherData} />
		</>
	)
}
