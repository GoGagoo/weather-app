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
import { WeatherData } from '../types/WeatherData'

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
	opacity: 0;
	transition: opacity 0.5s ease-in-out;
	animation: fadeIn 1.5s forwards;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
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
	box-shadow: 0px 7px 20px 5px rgba(0, 0, 0, 0.25);

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

interface Props {
	data: WeatherData | null
	unit: string | null
}

export const WeatherDetails: React.FC<Props> = ({ data, unit }) => {
	if (!data || !data.current || !data.hourly || !data.daily) return null

	const currentWeather = data.current
	const hourlyWeather = data.hourly
	const dailyWeather = data.daily

	const sunriseTime = new Date(dailyWeather.sunrise[0]).toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})

	const sunsetTime = new Date(dailyWeather.sunset[0]).toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})

	const wind = currentWeather.wind_speed_10m.toFixed()
	const pressure = currentWeather.pressure_msl.toFixed()

	const feelsLike = currentWeather.apparent_temperature.toFixed()
	const tempUnit = unit === 'celsius' ? 'C' : 'F'

	const visibility = (hourlyWeather.visibility[0] / 1000).toFixed()

	const details = [
		{
			title: 'SUNRISE',
			value: sunriseTime,
			icon: <Sunrise size={54} />,
		},
		{
			title: 'SUNSET',
			value: sunsetTime,
			icon: <Sunset size={54} />,
		},
		{
			title: 'PRECIPITATION',
			value: `${currentWeather.precipitation}%`,
			icon: <Droplet size={54} />,
		},
		{
			title: 'HUMIDITY',
			value: `${currentWeather.relative_humidity_2m}%`,
			icon: <Droplets size={54} />,
		},
		{
			title: 'WIND',
			value: `${wind} km/h`,
			icon: <Wind size={54} />,
		},
		{
			title: 'PRESSURE',
			value: `${pressure} hPa`,
			icon: <ArrowDownToLine size={54} />,
		},
		{
			title: 'FEELS LIKE',
			value: `${feelsLike}°${tempUnit}`,
			icon: <Thermometer size={54} />,
		},
		{
			title: 'VISIBILITY',
			value: `${visibility} km`,
			icon: <Eye size={54} />,
		},
	]

	return (
		<>
			<Title>Weather Details</Title>
			<WeatherDetailsContainer>
				{details.map((detail, index) => (
					<DetailBox key={index}>
						<DetailTitle>{detail.title}</DetailTitle>
						<DataWrapper>
							<DetailDataWrapper>
								<DetailData>{detail.value}</DetailData>
							</DetailDataWrapper>
							{detail.icon}
						</DataWrapper>
					</DetailBox>
				))}
			</WeatherDetailsContainer>
		</>
	)
}
