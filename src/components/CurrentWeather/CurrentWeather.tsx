import { MapPin } from 'lucide-react'
import {
	City,
	CityWrapper,
	CurrentWeatherBlock,
	CurrentWeatherInfo,
	Date,
	Temperature,
	UnderDate,
} from './CurrentWeather.styled'

interface Props {
	city: string
	temp: number | null
	date: string
	unit: string | undefined
}

export const CurrentWeather: React.FC<Props> = ({
	city,
	temp = null,
	date,
	unit = 'celsius',
}) => {
	const tempUnit = unit === 'celsius' ? 'C' : 'F'

	const currentTemp = temp !== null ? temp : 0
	const finalTemperature = currentTemp < 0 && currentTemp > -1 ? 0 : currentTemp
	const displayTemperature =
		finalTemperature !== undefined ? finalTemperature.toFixed() : 'N/A'

	return (
		<CurrentWeatherInfo>
			<CurrentWeatherBlock>
				<Date>
					<p>Today</p>
					<UnderDate>{date}</UnderDate>
				</Date>
			</CurrentWeatherBlock>
			<Temperature>
				{displayTemperature}°{tempUnit}
			</Temperature>
			<CityWrapper>
				<MapPin size={24} /> <City>{city}</City>
			</CityWrapper>
		</CurrentWeatherInfo>
	)
}
