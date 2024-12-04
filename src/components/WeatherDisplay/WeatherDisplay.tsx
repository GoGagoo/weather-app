import { useSelector } from 'react-redux'
import { TypedRootState } from '../../store/store'
import { Loader } from '../../uikit'
import { CurrentWeather } from '../CurrentWeather/CurrentWeather'
import { ForecastWeathers } from '../ForecastWeathers/ForecastWeathers'
import { Divide, WeatherDisplayContainer } from './WeatherDisplay.styled'

export const WeatherDisplay: React.FC = () => {
	const { forecastData, currentTemp, unit, city  } = useSelector(
		(state: TypedRootState) => state.weather
	)

	if (!forecastData.length || currentTemp === null || city === '') {
		console.warn("WeatherDisplay is waiting for data:", {
			forecastData,
			currentTemp,
			city,
		})
	}

	return (
		<>
			<WeatherDisplayContainer>
				<CurrentWeather />
				<ForecastWeathers forecast={forecastData} unit={unit} />
			</WeatherDisplayContainer>
			<Divide />
		</>
	)
}
