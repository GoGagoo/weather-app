import { useEffect, useState } from 'react'
import { WeatherData as WeatherDataType } from 'types/WeatherData'
import { getWeatherData } from '../api'
import { Loader } from '../uikit'
import { NotFound } from './NotFound'
import { WeatherDetails } from './WeatherDetails'
import { WeatherDisplay } from './WeatherDisplay'

interface Props {
	city: string
	data: WeatherDataType | null
	unit: string
}

export const WeatherInfo: React.FC<Props> = ({ unit, data, city }) => {
	const [weatherData, setWeatherData] = useState<WeatherDataType | null>(data)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchWeather = async () => {
			setLoading(true)
			try {
				const data = await getWeatherData(city, unit)
				setWeatherData(data)
			} catch (error) {
				console.error(error)
				setWeatherData(null)
			} finally {
				setLoading(false)
			}
		}
		fetchWeather()
	}, [unit, city])

	useEffect(() => {
		if (data) {
			setWeatherData(data)
		}
	}, [data])

	if (loading) return <Loader />

	if (!weatherData) return <NotFound />

	return (
		<>
			<WeatherDisplay city={city} data={weatherData} unit={unit} />
			<WeatherDetails data={weatherData} />
		</>
	)
}
