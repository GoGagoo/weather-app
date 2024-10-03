import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ForecastItem } from '../../types/WeatherData'
import {
	ForecastCurrentData,
	ForecastDataWrapper,
	ForecastOtherData,
	ForecastTemperature,
	HourlyForecastContainer,
	WeatherTime,
} from './ForecastWeathers.styled'

export const ForecastWeathers: React.FC = () => {
	const forecast = useTypedSelector((state) => state.weather.forecastData)
	const unit = useTypedSelector((state) => state.weather.unit)

	const tempUnit = unit === 'celsius' ? 'C' : 'F'

	const formatTemperature = (temp: number) => {
		if (temp < 0 && temp > -1) {
			return 0
		}
		return temp
	}

	return (
		<HourlyForecastContainer>
			{forecast.slice(0, 8).map((item: ForecastItem, index: number) => (
				<ForecastDataWrapper key={index}>
					{index === 0 ? (
						<>
							<WeatherTime>Now</WeatherTime>
							<ForecastCurrentData>
								<img
									src={item.icon}
									alt='Weather Icon'
									style={{ width: '48px', height: '48px' }}
								/>
								<ForecastTemperature>
									{formatTemperature(item.temperature_2m).toFixed()}°{tempUnit}
								</ForecastTemperature>
							</ForecastCurrentData>
						</>
					) : (
						<>
							<WeatherTime>{item.time}</WeatherTime>
							<ForecastOtherData>
								<img
									src={item.icon}
									alt='Weather Icon'
									style={{ width: '48px', height: '48px' }}
								/>
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
