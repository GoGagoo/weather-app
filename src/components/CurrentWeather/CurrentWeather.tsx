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
import { getDayOfWeek } from '../../utils/formatters/date'

export const CurrentWeather: React.FC = () => {
	const { city, currentTemp, unit } = useTypedSelector((state) => state.weather)

	const tempUnit = unit === 'celsius' ? 'C' : 'F'
	let finalTemperature = currentTemp !== null ? currentTemp.toFixed() : 'N/A'

	if (finalTemperature === '-0') finalTemperature = '0'

	return (
		<CurrentWeatherInfo>
			<CurrentWeatherBlock>
				<Date>
					<p>Today</p>
					<UnderDate>{getDayOfWeek()}</UnderDate>
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
