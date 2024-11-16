import { useEffect, useState } from 'react'
import { Loader } from '../../uikit'
import { CurrentWeather } from '../CurrentWeather/CurrentWeather'
import { ForecastWeathers } from '../ForecastWeathers/ForecastWeathers'
import { Divide, WeatherDisplayContainer } from './WeatherDisplay.styled'

interface Props {
	data: any
	unit: string
	city: string
}

export const WeatherDisplay: React.FC<Props> = ({ data, unit, city }) => {
	const [forecastData, setForecastData] = useState<any[]>([])
	const [currentTemp, setCurrentTemp] = useState<number | null>(null)

	const getWeatherIcon = (code: number): string => {
		const weatherIcons: { [key: number]: string } = {
			0: 'https://openweathermap.org/img/wn/01d.png', // Ясно
			1: 'https://openweathermap.org/img/wn/02d.png', // Частично облачно
			2: 'https://openweathermap.org/img/wn/03d.png', // Облачно
			3: 'https://openweathermap.org/img/wn/04d.png', // Пасмурно
			45: 'https://openweathermap.org/img/wn/09d.png', // Легкий дождь
			48: 'https://openweathermap.org/img/wn/10d.png', // Сильный дождь
			51: 'https://openweathermap.org/img/wn/13d.png', // Морось
			61: 'https://openweathermap.org/img/wn/50d.png', // Ливень
			71: 'https://openweathermap.org/img/wn/50d.png', // Снегопад
			80: 'https://openweathermap.org/img/wn/11d.png', // Гроза
			95: 'https://openweathermap.org/img/wn/11d.png', // Сильная гроза
		}

		return weatherIcons[code] || 'https://openweathermap.org/img/wn/01n.png' // Иконка по умолчанию
	}

	const cityName = city || 'Unknown City'
	const currentDate =
		(data?.current_weather?.time || Date.now() / 1000) +
		(data?.utc_offset_seconds || 0)

	useEffect(() => {
		if (data && data.hourly && data.hourly.temperature_2m) {
			const currentTimeUTC = Date.now()

			const forecast: any = data.hourly.temperature_2m.map(
				(temp: number, index: number) => {
					const weatherCode = data.hourly.weather_code[index]
					const weatherIcon = getWeatherIcon(weatherCode)

					return {
						time: new Date(data.hourly.time[index]).toLocaleTimeString(
							'en-GB',
							{
								hour: 'numeric',
								hour12: true,
							}
						),
						temperature_2m: temp,
						icon: <img src={weatherIcon} alt='Weather icon' />,
					}
				}
			)

			let closestForecastIndex = -1
			for (let i = 0; i < forecast.length; i++) {
				const forecastTime = new Date(data.hourly.time[i]).getTime()
				if (forecastTime <= currentTimeUTC) {
					closestForecastIndex = i
				} else {
					break
				}
			}

			if (closestForecastIndex === -1) closestForecastIndex = 0

			const currentTemperature =
				data.hourly.temperature_2m[closestForecastIndex] || null
			setCurrentTemp(currentTemperature)

			const filteredForecast = forecast.slice(closestForecastIndex)
			setForecastData(filteredForecast)
		}
	}, [data])

	if (!data) return <Loader />

	const date = new Date(currentDate * 1000)
	const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
	const dayOfMonth = date.getDate()
	const month = date.toLocaleString('en-US', { month: 'short' })

	const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`

	return (
		<>
			<WeatherDisplayContainer>
				<CurrentWeather
					date={formattedDate}
					temp={currentTemp}
					city={cityName}
					unit={unit}
				/>
				<ForecastWeathers forecast={forecastData} unit={unit} />
			</WeatherDisplayContainer>
			<Divide />
		</>
	)
}
