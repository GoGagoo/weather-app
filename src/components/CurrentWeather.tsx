import { MapPin } from 'lucide-react'
import styled from 'styled-components'

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

const Date = styled.div`
	display: flex;
	font-size: 27px;
	flex-direction: column;
	align-items: center;
	color: #ffffffe8;
`

const UnderDate = styled.div`
	margin-top: 10px;
	font-size: 14px;
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

const CityWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
`

const City = styled.p`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	margin-top: 10px;
	font-weight: 300;
	font-size: 20px;
`

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
	const displayTemperature = finalTemperature !== undefined ? finalTemperature.toFixed() : 'N/A'

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
