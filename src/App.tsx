import {
	Navbar,
	SearchInput,
	TempToggler,
	WeatherInfo
} from './components'

const App: React.FC = () => {
	return (
		<>
			<Navbar>
				<SearchInput />
				<TempToggler />
			</Navbar>
			<WeatherInfo />
		</>
	)
}

export default App
