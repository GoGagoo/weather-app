import { Cloud, MapPin, Snowflake } from 'lucide-react'
import styled from 'styled-components'

const WeatherDisplayContainer = styled.div`
	margin: 90px 44px 96px 34px;
	padding: 44px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Divide = styled.div`
	height: 1px;
	width: 100%;
	background-color: #ffffff8b;
`

const CurrentWeatherBlock = styled.div`
	display: flex;
	gap: 15px;
	justify-content: space-between;
	align-items: center;
	color: --primary-text-color;
`

const CurrentWeatherInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: --primary-text-color;
`

const CurrentWeatherDate = styled.div`
	display: flex;
	font-size: 27px;
	flex-direction: column;
	align-items: center;
	color: --primary-text-color;
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

//

const HourlyForecastContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 25px;
`

const ForecastDataWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`

const WeatherTime = styled.p`
	font-size: 20px;
	color: --primary-text-color;
`

const ForecastCurrentData = styled.div`
	display: flex;
	background-color: #a5e8e9;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	border: 1px solid #b3e7e6;
	border-radius: 50px;
	gap: 15px;
	color: --primary-text-color;

	&:hover {
		background-color: #80e9ea;
		transition: 150ms;
	}
`

const ForecastOtherData = styled.div`
	display: flex;
	background-color: #1d9496;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	border: 2px solid #b3e7e6;
	border-radius: 50px;
	gap: 15px;
	color: --primary-text-color;

	&:hover {
		background-color: #21a4a6;
		transition: 150ms;
	}
`

const ForecastTemperature = styled.p`
	font-size: 20px;
	color: --primary-text-color;
`

export const WeatherDisplay = () => {
	return (
		<>
			<WeatherDisplayContainer>
				<CurrentWeatherInfo>
					<CurrentWeatherBlock>
						<CurrentWeatherDate>
							<p>Today</p>
							<p style={{ fontSize: '14px' }}>Ср, 17 Фев</p>
						</CurrentWeatherDate>
						<Snowflake size={44} />
					</CurrentWeatherBlock>
					<Temperature>2°</Temperature>
					<CityCountryWrapper>
						<MapPin size={24} /> <CityCountry>Cracow, Poland</CityCountry>
					</CityCountryWrapper>
				</CurrentWeatherInfo>
				<HourlyForecastContainer>
					<ForecastDataWrapper>
						<WeatherTime>Now</WeatherTime>
						<ForecastCurrentData>
							<Snowflake size={44} />
							<ForecastTemperature>2°</ForecastTemperature>
						</ForecastCurrentData>
					</ForecastDataWrapper>
					<ForecastDataWrapper>
						<WeatherTime>12 pm</WeatherTime>
						<ForecastOtherData>
							<Cloud size={44} />
							<ForecastTemperature>2°</ForecastTemperature>
						</ForecastOtherData>
					</ForecastDataWrapper>
					<ForecastDataWrapper>
						<WeatherTime>1 pm</WeatherTime>
						<ForecastOtherData>
							<Cloud size={44} />
							<ForecastTemperature>-1°</ForecastTemperature>
						</ForecastOtherData>
					</ForecastDataWrapper>
					<ForecastDataWrapper>
						<WeatherTime>2 pm</WeatherTime>
						<ForecastOtherData>
							<Cloud size={44} />
							<ForecastTemperature>-1°</ForecastTemperature>
						</ForecastOtherData>
					</ForecastDataWrapper>
					<ForecastDataWrapper>
						<WeatherTime>3 pm</WeatherTime>
						<ForecastOtherData>
							<Cloud size={44} />
							<ForecastTemperature>-3°</ForecastTemperature>
						</ForecastOtherData>
					</ForecastDataWrapper>
					<ForecastDataWrapper>
						<WeatherTime>4 pm</WeatherTime>
						<ForecastOtherData>
							<Cloud size={44} />
							<ForecastTemperature>-3°</ForecastTemperature>
						</ForecastOtherData>
					</ForecastDataWrapper>
					<ForecastDataWrapper>
						<WeatherTime>5 pm</WeatherTime>
						<ForecastOtherData>
							<Cloud size={44} />
							<ForecastTemperature>-1°</ForecastTemperature>
						</ForecastOtherData>
					</ForecastDataWrapper>
					<ForecastDataWrapper>
						<WeatherTime>6 pm</WeatherTime>
						<ForecastOtherData>
							<Cloud size={44} />
							<ForecastTemperature>0°</ForecastTemperature>
						</ForecastOtherData>
					</ForecastDataWrapper>
				</HourlyForecastContainer>
			</WeatherDisplayContainer>
			<Divide />
		</>
	)
}
