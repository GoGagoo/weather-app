import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getWeatherData } from '../api'
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

export const WeatherDisplay = () => {
	const [weatherData, setWeatherData] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [forecastData, setForecastData] = useState<
		{ 
			temperature: number; 
			time: string; 
			icon: JSX.Element 
		}[]
	>([])

	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=Yerevan&appid=${WEATHER_API_KEY}`
		)
			.then((res) => res.json())
			.then((data) => {
				const forecastData = data.list.map((item: any, index: any) => ({
					time: new Date(item.dt * 1000).toLocaleTimeString('en-GB', { hour: 'numeric', hour12: true }).toLowerCase(),
					temperature: Math.round(item.main.temp - 273.15),
					icon: (
						<img
							src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
							alt={item.weather[0].description}
						/>
					),
				}))
				setForecastData(forecastData)
			})
			.catch((error) => console.error(error))
	}, [])

	useEffect(() => {
		const fetchWeather = async () => {
			const data = await getWeatherData('Yerevan')
			setWeatherData(data)
			setLoading(false)
		}
		fetchWeather()
	}, [])

	if (loading) {
		return <p>Loading weather data...</p>
	}

	if (!weatherData) {
		return <p>Error loading weather data</p>
	}

	const { main, name, dt, sys, weather } = weatherData

	const cityName = name
	const country = sys.country

	const temperatureCelsius = main.temp
	const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32

	const date = new Date(dt * 1000)
	const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
	const dayOfMonth = date.getDate()
	const month = date.toLocaleString('en-US', { month: 'short' })


	const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`

	return (
		<>
			<WeatherDisplayContainer>
				<CurrentWeather date={formattedDate} temp={temperatureCelsius} city={cityName} country={country} />
				<ForecastWeathers forecast={forecastData} />
			</WeatherDisplayContainer>
			<Divide />
		</>
	)
}
