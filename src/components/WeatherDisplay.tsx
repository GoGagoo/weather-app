import { MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getWeatherData } from '../api'
import { WEATHER_API_KEY } from '../constants/constants'

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

const CurrentWeatherBlock = styled.div`
	display: flex;
	gap: 15px;
	justify-content: space-between;
	align-items: center;
	color: #ffffffe8;
`

const CurrentWeatherInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #ffffffe8;
`

const CurrentWeatherDate = styled.div`
	display: flex;
	font-size: 27px;
	flex-direction: column;
	align-items: center;
	color: #ffffffe8;
`

const Temperature = styled.h1`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	margin-top: 10px;
	font-weight: 300;
	font-size: 90px;
`

const CityCountryWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
`

const CityCountry = styled.p`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	margin-top: 10px;
	font-weight: 300;
	font-size: 20px;
`

//

const HourlyForecastContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 25px;
`

const ForecastDataWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`

const WeatherTime = styled.p`
	font-size: 20px;
	color: #ffffffe8;
`

const ForecastCurrentData = styled.div`
	display: flex;
	background-color: #a5e8e9;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	border: 1px solid #b3e7e6;
	border-radius: 50px;
	gap: 15px;
	color: #ffffffe8;

	&:hover {
		background-color: #80e9ea;
		transition: 150ms;
	}
`

const ForecastOtherData = styled.div`
	display: flex;
	background-color: #1d9496;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	border: 2px solid #b3e7e6;
	border-radius: 50px;
	gap: 15px;
	color: #ffffffe8;

	&:hover {
		background-color: #21a4a6;
		transition: 350ms;
	}
`

const ForecastTemperature = styled.p`
	font-size: 20px;
	color: #ffffffe8;
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

	const temperatureCelsius = main.temp
	const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32

	const date = new Date(dt * 1000)
	const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
	const dayOfMonth = date.getDate()
	const month = date.toLocaleString('en-US', { month: 'short' })

	const country = sys.country

	const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`

	return (
		<>
			<WeatherDisplayContainer>
				<CurrentWeatherInfo>
					<CurrentWeatherBlock>
						<CurrentWeatherDate>
							<p>Today</p>
							<p style={{ fontSize: '14px' }}>{formattedDate}</p>
						</CurrentWeatherDate>
						{weather.icon}
					</CurrentWeatherBlock>
					<Temperature>{temperatureCelsius.toFixed()}°</Temperature>
					<CityCountryWrapper>
						<MapPin size={24} />{' '}
						<CityCountry>
							{cityName}, {country}
						</CityCountry>
					</CityCountryWrapper>
				</CurrentWeatherInfo>
				<HourlyForecastContainer>
					{forecastData.slice(0, 8)!.map((item, index) => (
						<ForecastDataWrapper key={index}>
							{index === 0 ? (
								<>
									<WeatherTime>Now</WeatherTime>
									<ForecastCurrentData>
										{item.icon}
									<ForecastTemperature>
										{item.temperature.toFixed()}°
									</ForecastTemperature>
								</ForecastCurrentData>
								</>
							) : (
								<>
									<WeatherTime>{item.time}</WeatherTime>
									<ForecastOtherData>
										{item.icon}
										<ForecastTemperature>
											{item.temperature.toFixed()}°
										</ForecastTemperature>
									</ForecastOtherData>
								</>
							)}
						</ForecastDataWrapper>
					))}
				</HourlyForecastContainer>
			</WeatherDisplayContainer>
			<Divide />
		</>
	)
}
