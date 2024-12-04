import { ForecastItem } from '../../types/WeatherData'
import {
	ForecastCurrentData,
	ForecastDataWrapper,
	ForecastOtherData,
	ForecastTemperature,
	HourlyForecastContainer,
	WeatherTime,
} from './ForecastWeathers.styled'

interface Props {
	forecast: ForecastItem[]
	unit: string
}

export const ForecastWeathers: React.FC<Props> = ({ forecast, unit }) => {
	const tempUnit = unit === 'celsius' ? 'C' : 'F'

	const formatTemperature = (temp: number) => {
		if (temp < 0 && temp > -1) {
			return 0
		}
		return temp
	}

	return (
		<HourlyForecastContainer>
			{forecast.slice(0, 8).map((item, index) => (
				<ForecastDataWrapper key={index}>
					{index === 0 ? (
						<>
							<WeatherTime>Now</WeatherTime>
							<ForecastCurrentData>
								{item.icon}
								<ForecastTemperature>
									{formatTemperature(item.temperature_2m).toFixed()}°{tempUnit}
								</ForecastTemperature>
							</ForecastCurrentData>
						</>
					) : (
						<>
							<WeatherTime>{item.time}</WeatherTime>
							<ForecastOtherData>
								{item.icon}
								<ForecastTemperature>
									{formatTemperature(item.temperature_2m).toFixed()}°{tempUnit}
								</ForecastTemperature>
							</ForecastOtherData>
						</>
					)}
				</ForecastDataWrapper>
			))}
		</HourlyForecastContainer>
	)
}
