import styled from 'styled-components'

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
	color: #ffffffe8;
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
	color: #ffffffe8;

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
	color: #ffffffe8;

	&:hover {
		background-color: #21a4a6;
		transition: 350ms;
	}
`

const ForecastTemperature = styled.p`
	font-size: 20px;
	color: #ffffffe8;
`

interface Props {
	forecast: {
		time: string
		icon: JSX.Element
		temperature: number
	}[]
}

export const ForecastWeathers: React.FC<Props> = ({ forecast }) => {
	return (
		<HourlyForecastContainer>
			{forecast.slice(0, 8)!.map((item, index) => (
				<ForecastDataWrapper key={index}>
					{index === 0 ? (
						<>
							<WeatherTime>Now</WeatherTime>
							<ForecastCurrentData>
								{item.icon}
								<ForecastTemperature>
									{item.temperature.toFixed()}°
								</ForecastTemperature>
							</ForecastCurrentData>
						</>
					) : (
						<>
							<WeatherTime>{item.time}</WeatherTime>
							<ForecastOtherData>
								{item.icon}
								<ForecastTemperature>
									{item.temperature.toFixed()}°
								</ForecastTemperature>
							</ForecastOtherData>
						</>
					)}
				</ForecastDataWrapper>
			))}
		</HourlyForecastContainer>
	)
}
