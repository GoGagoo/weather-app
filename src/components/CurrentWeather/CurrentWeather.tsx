import { MapPin } from 'lucide-react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
	City,
	CityWrapper,
	CurrentWeatherBlock,
	CurrentWeatherInfo,
	Date,
	Temperature,
	UnderDate,
} from './CurrentWeather.styled'

export const CurrentWeather: React.FC = () => {
	const { city, currentTemp, unit } = useTypedSelector((state) => state.weather)

	const now = new globalThis.Date()
	const dayOfWeek = now.toLocaleString('en-US', { weekday: 'short' })
	const dayOfMonth = now.getDate()
	const month = now.toLocaleString('en-US', { month: 'short' })

	const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`

	const tempUnit = unit === 'celsius' ? 'C' : 'F'
	let finalTemperature = currentTemp !== null ? currentTemp.toFixed() : 'N/A'

	if (finalTemperature === '-0') finalTemperature = '0'

	return (
		<CurrentWeatherInfo>
			<CurrentWeatherBlock>
				<Date>
					<p>Today</p>
					<UnderDate>{formattedDate}</UnderDate>
				</Date>
			</CurrentWeatherBlock>
			<Temperature>
				{finalTemperature}°{tempUnit}
			</Temperature>
			<CityWrapper>
				<MapPin size={24} /> <City>{city}</City>
			</CityWrapper>
		</CurrentWeatherInfo>
	)
}
