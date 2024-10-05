import { useEffect, useState } from 'react'
import {
	ArrowDownToLine,
	Droplet,
	Droplets,
	Eye,
	Sunrise,
	Sunset,
	Thermometer,
	Wind,
} from 'lucide-react'
import styled from 'styled-components'
import { getWeatherData } from '../api'
import { WEATHER_API_KEY } from '../constants/constants'

const Title = styled.div`
		font-size: 27px;
		color: #ffffffe8;
		margin: 32px 0 0 71px;
	`

	const WeatherDetailsContainer = styled.div`
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 17px;
		margin: 40px 44px 100px 64px;
	`

	const DetailBox = styled.div`
		display: flex;
		flex-direction: column;
		background: #ddf5f9;
		padding: 25px;
		border-radius: 8px;
		text-align: center;
		margin: 0 10px;
		color: #072a41;
		font-weight: bold;
		box-shadow: 0px 7px 20px 5px rgba(0,0,0,0.25);

		&:hover {
			background: #a1ccd3;
			color: #022d4a;
			transition: 350ms;
		}
	`

	const DataWrapper = styled.div`
		margin-top: 55px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		width: 100%;
	`

	const DetailDataWrapper = styled.div`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	`

	const DetailTitle = styled.p`
		display: flex;
		justify-content: flex-start;
		font-size: 22px;
		color: #3b4f6d;
		margin-bottom: 8px;
	`

	const DetailData = styled.p`
		font-size: 38px;
		margin: 0;
	`

export const WeatherDetails = () => {
	const [weatherData, setWeatherData] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)

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

	const { main } = weatherData

	const wind = weatherData.wind.speed * 3.6
	const feelsLikeInCelsius = (weatherData.main.feels_like).toFixed()
	const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-GB', { hour: 'numeric', hour12: true, minute: '2-digit' })
	const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-GB', { hour: 'numeric', hour12: true, minute: '2-digit' })
	const visibility = weatherData.visibility / 1000

	return (
		<>
			<Title>Weather Details</Title>
			<WeatherDetailsContainer>
				<DetailBox>
					<DetailTitle>SUNRISE</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>{sunrise}</DetailData>
						</DetailDataWrapper>
						<Sunrise size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>SUNSET</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>{sunset}</DetailData>
						</DetailDataWrapper>
						<Sunset size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>PRECIPITATION</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>{weatherData.clouds.all}%</DetailData>
						</DetailDataWrapper>
						<Droplet size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>HUMIDITY</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>{main.humidity}%</DetailData>
						</DetailDataWrapper>
						<Droplets size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>WIND</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>{wind} km/h</DetailData>
						</DetailDataWrapper>
						<Wind size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>PRESSURE</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>{main.pressure} hPa</DetailData>
						</DetailDataWrapper>
						<ArrowDownToLine size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>FEELS LIKE</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>{feelsLikeInCelsius}°C</DetailData>
						</DetailDataWrapper>
						<Thermometer size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>VISIBILITY</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>{visibility} km</DetailData>
						</DetailDataWrapper>
						<Eye size={54} />
					</DataWrapper>
				</DetailBox>
			</WeatherDetailsContainer>
		</>
	)
}
