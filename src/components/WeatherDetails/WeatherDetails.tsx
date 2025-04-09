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
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
	DataWrapper,
	DetailBox,
	DetailData,
	DetailDataWrapper,
	DetailTitle,
	IconWrapper,
	Title,
	WeatherDetailsContainer,
} from './WeatherDetails.styled'
import { WeatherDetailItem } from './types'

export const WeatherDetails = () => {
	const { data, unit } = useTypedSelector((state) => state.weather)

	if (!data || !data.current || !data.hourly || !data.daily) return null

	const currentWeather = data.current
	const hourlyWeather = data.hourly
	const dailyWeather = data.daily

	const sunriseTime = new Date(dailyWeather.sunrise[0]).toLocaleTimeString(
		'en-GB',
		{
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		}
	)

	const sunsetTime = new Date(dailyWeather.sunset[0]).toLocaleTimeString(
		'en-GB',
		{
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		}
	)

	const wind = currentWeather.wind_speed_10m.toFixed()
	const pressure = currentWeather.pressure_msl.toFixed()

	const feelsLike = currentWeather.apparent_temperature.toFixed()
	const tempUnit = unit === 'celsius' ? 'C' : 'F'

	const visibility = (hourlyWeather.visibility[0] / 1000).toFixed()

	const details: WeatherDetailItem[] = [
		{
			title: 'SUNRISE',
			value: sunriseTime,
			icon: (
				<IconWrapper>
					<Sunrise />
				</IconWrapper>
			),
		},
		{
			title: 'SUNSET',
			value: sunsetTime,
			icon: (
				<IconWrapper>
					<Sunset />
				</IconWrapper>
			),
		},
		{
			title: 'PRECIPITATION',
			value: `${currentWeather.precipitation}%`,
			icon: (
				<IconWrapper>
					<Droplet />
				</IconWrapper>
			),
		},
		{
			title: 'HUMIDITY',
			value: `${currentWeather.relative_humidity_2m}%`,
			icon: (
				<IconWrapper>
					<Droplets />
				</IconWrapper>
			),
		},
		{
			title: 'WIND',
			value: `${wind} km/h`,
			icon: (
				<IconWrapper>
					<Wind />
				</IconWrapper>
			),
		},
		{
			title: 'PRESSURE',
			value: `${pressure} hPa`,
			icon: (
				<IconWrapper>
					<ArrowDownToLine />
				</IconWrapper>
			),
		},
		{
			title: 'FEELS LIKE',
			value: `${feelsLike}°${tempUnit}`,
			icon: (
				<IconWrapper>
					<Thermometer />
				</IconWrapper>
			),
		},
		{
			title: 'VISIBILITY',
			value: `${visibility} km`,
			icon: (
				<IconWrapper>
					<Eye />
				</IconWrapper>
			),
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
