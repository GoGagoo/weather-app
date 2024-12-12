import { useTypedSelector } from '../../hooks/useTypedSelector'
import { CurrentWeather } from '../CurrentWeather/CurrentWeather'
import { ForecastWeathers } from '../ForecastWeathers/ForecastWeathers'
import { Divide, WeatherDisplayContainer } from './WeatherDisplay.styled'

export const WeatherDisplay: React.FC = () => {
	const { forecastData, currentTemp, city } = useTypedSelector(
		(state) => state.weather
	)

	if (!forecastData.length || currentTemp === null || city === '') {
		console.warn('WeatherDisplay is waiting for data:', {
			forecastData,
			currentTemp,
			city,
		})
	}

	return (
		<>
			<WeatherDisplayContainer>
				<CurrentWeather />
				<ForecastWeathers />
			</WeatherDisplayContainer>
			<Divide />
		</>
	)
}
