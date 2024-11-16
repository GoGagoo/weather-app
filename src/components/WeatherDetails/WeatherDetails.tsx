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
import { WeatherData } from '../../types/WeatherData'
import { DataWrapper, DetailBox, DetailData, DetailDataWrapper, DetailTitle, Title, WeatherDetailsContainer } from './WeatherDetails.styled'

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
