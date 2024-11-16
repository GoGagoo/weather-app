import { useEffect, useState } from 'react'
import { WeatherData as WeatherDataType } from '../types/WeatherData'
import { Loader } from '../uikit'
import { NotFound } from './NotFound/NotFound'
import { WeatherDetails } from './WeatherDetails/WeatherDetails'
import { WeatherDisplay } from './WeatherDisplay/WeatherDisplay'

interface Props {
	city: string
	data: WeatherDataType | null
	unit: string
	lat: number | null
	lon: number | null
	timezone: string | null
}

export const WeatherInfo: React.FC<Props> = ({
	unit,
	data,
	city,
	lat,
	lon,
	timezone,
}) => {
	const [weatherData, setWeatherData] = useState<WeatherDataType | null>(data)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchWeather = async () => {
			setLoading(true)
			try {
				const response = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,pressure_msl,wind_speed_10m&hourly=temperature_2m,visibility&daily=sunrise,sunset&timezone=${
						timezone || 'auto'
					}&temperature_unit=${unit}`
				)

				const data = await response.json()

				if (!data || !data.hourly || !data.current || !data.daily) {
					throw new Error('Invalid data structure')
				}

				if (data.current.temperature_2m === -0) {
					data.current.temperature_2m = 0
				}

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
			<WeatherDetails unit={unit} data={weatherData} />
		</>
	)
}
