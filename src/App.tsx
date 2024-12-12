import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Togglers } from './App.styled'
import {
	Navbar,
	SearchInput,
	TempToggler,
	ThemeToggler,
	WeatherInfo,
} from './components'
import { useGeolocation } from './hooks/useGeolocation'
import { useTypedSelector } from './hooks/useTypedSelector'
import { fetchWeatherByCity, setUnit } from './store/weatherSlice'
import { Loader } from './uikit'

const App: React.FC = () => {
	const dispatch = useDispatch()

	useGeolocation()

	useEffect(() => {
		dispatch(fetchWeatherByCity('Oslo'))
	}, [dispatch])

	const { data: weatherData, loading } = useTypedSelector(
		(state) => state.weather
	)

	const handleSearch = (newCity: string) => {
		dispatch(fetchWeatherByCity(newCity))
	}

	const handleUnitChange = (newUnit: string) => {
		dispatch(setUnit(newUnit))
	}

	return (
		<>
			<Navbar>
				<SearchInput onSearch={handleSearch} />
				<Togglers>
					<ThemeToggler />
					<TempToggler onUnitChange={handleUnitChange} />
				</Togglers>
			</Navbar>
			{loading ? <Loader /> : weatherData ? <WeatherInfo /> : null}
		</>
	)
}

export default App
