import {
	Navbar,
	SearchInput,
	TempToggler,
	WeatherDetails,
	WeatherDisplay,
} from './components'

const App: React.FC = () => {
	return (
		<>
			<Navbar>
				<SearchInput />
				<TempToggler />
			</Navbar>
			<WeatherDisplay />
			<WeatherDetails />
		</>
	)
}

export default App
