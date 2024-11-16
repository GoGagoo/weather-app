import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../uikit'
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

export const WeatherDisplay: React.FC<Props> = ({ data, unit, city }) => {
	const [forecastData, setForecastData] = useState<any[]>([])
	const [currentTemp, setCurrentTemp] = useState<number | null>(null)

	const cityName = city || 'Unknown City'
	const currentDate =
		(data?.current_weather?.time || Date.now() / 1000) +
		(data?.utc_offset_seconds || 0)

	useEffect(() => {
		if (data && data.hourly && data.hourly.temperature_2m) {
			const currentTimeUTC = Date.now()

			const forecast: any = data.hourly.temperature_2m.map(
				(temp: number, index: number) => ({
					time: new Date(data.hourly.time[index]).toLocaleTimeString('en-GB', {
						hour: 'numeric',
						hour12: true,
					}),
					temperature_2m: temp,
					icon: (
						<img
							src={`https://openweathermap.org/img/wn/01d.png`}
							alt='Weather icon'
						/>
					),
				})
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
