import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Togglers } from './App.styled'
import {
	Navbar,
	SearchInput,
	TempToggler,
	ThemeToggler,
	WeatherInfo,
} from './components'
import { TypedRootState } from './store/store'
import {
	fetchWeatherByCity,
	fetchWeatherByCoords,
	setUnit,
} from './store/weatherSlice'
import { Loader } from './uikit'

const App: React.FC = () => {
	const dispatch = useDispatch()
	const { data: weatherData, loading } = useSelector(
		(state: TypedRootState) => state.weather
	)

	const handleSearch = (newCity: string) => {
		dispatch(fetchWeatherByCity(newCity))
	}

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords
					dispatch(fetchWeatherByCoords({ latitude, longitude }))
				},
				(error) => {
					console.error('Error getting location:', error)
					dispatch(fetchWeatherByCity('Oslo'))
				}
			)
		} else {
			dispatch(fetchWeatherByCity('Oslo'))
		}
	}, [dispatch])

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
