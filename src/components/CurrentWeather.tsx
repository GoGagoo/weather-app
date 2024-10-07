import { MapPin } from 'lucide-react'
import styled, { keyframes } from 'styled-components'

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

interface Props {
	city: string
	country: string
	temp: number
	date: string
}

export const CurrentWeather: React.FC<Props> = ({ city, country, temp, date }) => {
	return (
		<CurrentWeatherInfo>
			<CurrentWeatherBlock>
				<CurrentWeatherDate>
					<p>Today</p>
					<p style={{ fontSize: '14px' }}>{date}</p>
				</CurrentWeatherDate>
			</CurrentWeatherBlock>
			<Temperature>{temp.toFixed()}°</Temperature>
			<CityCountryWrapper>
				<MapPin size={24} />{' '}
				<CityCountry>
					{city}, {country}
				</CityCountry>
			</CityCountryWrapper>
		</CurrentWeatherInfo>
	)
}
