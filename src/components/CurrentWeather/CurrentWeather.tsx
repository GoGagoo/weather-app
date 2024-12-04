import { MapPin } from 'lucide-react'
import { useSelector } from 'react-redux'
import { TypedRootState } from '../../store/store'
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
	const { city, currentTemp, unit } = useSelector(
		(state: TypedRootState) => state.weather
	)

	const now = new globalThis.Date()
	const dayOfWeek = now.toLocaleString('en-US', { weekday: 'short' })
	const dayOfMonth = now.getDate()
	const month = now.toLocaleString('en-US', { month: 'short' })

	const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`

	const tempUnit = unit === 'celsius' ? 'C' : 'F'
	const finalTemperature =
		currentTemp !== null && currentTemp > -1 ? currentTemp.toFixed() : 'N/A'

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
