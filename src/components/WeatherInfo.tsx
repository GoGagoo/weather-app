import { useTypedSelector } from '../hooks/useTypedSelector'
import { Loader } from '../uikit'
import { NotFound } from './NotFound/NotFound'
import { WeatherDetails } from './WeatherDetails/WeatherDetails'
import { WeatherDisplay } from './WeatherDisplay/WeatherDisplay'

export const WeatherInfo: React.FC = () => {
	const { loading, error, data, unit } = useTypedSelector(
		(state) => state.weather
	)

	if (loading) return <Loader />
	if (error || !data) return <NotFound />

	return (
		<>
			<WeatherDisplay />
			<WeatherDetails unit={unit} data={data} />
		</>
	)
}
