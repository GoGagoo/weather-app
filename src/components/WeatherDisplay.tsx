import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { WEATHER_API_KEY } from '../constants/constants'
import { CurrentWeather } from './CurrentWeather'
import { ForecastWeathers } from './ForecastWeathers'

const WeatherDisplayContainer = styled.div`
	margin: 90px 44px 96px 34px;
	padding: 44px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Divide = styled.div`
	height: 1px;
	width: 100%;
	background-color: #ffffff8b;
`

interface Props {
	data: any
	unit: string
	city: string
}

type ForecastData = {
	temperature: number
	time: string
	icon: JSX.Element
}

export const WeatherDisplay: React.FC<Props> = ({ data, unit, city }) => {
	const [forecastData, setForecastData] = useState<ForecastData[]>([])

	useEffect(() => {
		const fetchWeatherData = async () => {
			try {
				const res = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
				)
				const data = await res.json()

				if (!data.coord) {
					throw new Error('Не удалось получить координаты.')
				}

				const lat = data.coord.lat
				const lon = data.coord.lon

				const weatherResponse = await fetch(
					`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=${unit}&appid=${WEATHER_API_KEY}`
				)
				const weatherData = await weatherResponse.json()

				const forecast = weatherData.hourly.map((item: any) => ({
					time: new Date(item.dt * 1000).toLocaleTimeString('en-GB', {
						hour: 'numeric',
						hour12: true,
					}),
					temperature: Math.round(item.temp),
					icon: (
						<img
							src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
							alt={item.weather[0].description}
						/>
					),
				}))

				setForecastData(forecast)
			} catch (error) {
				console.error(error)
			}
		}

		fetchWeatherData()
	}, [unit, city])

	if (!data || !data.main || !data.sys) {
		return <div>Загрузка данных о погоде...</div>
	}

	const { main, name, dt, sys } = data

	const cityName = name
	const country = sys.country

	const temperatureCelsius = main.temp

	const date = new Date(dt * 1000)
	const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
	const dayOfMonth = date.getDate()
	const month = date.toLocaleString('en-US', { month: 'short' })

	const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`

	return (
		<>
			<WeatherDisplayContainer>
				<CurrentWeather
					date={formattedDate}
					temp={temperatureCelsius}
					city={cityName}
					country={country}
				/>
				<ForecastWeathers forecast={forecastData} unit={unit} />
			</WeatherDisplayContainer>
			<Divide />
		</>
	)
}
