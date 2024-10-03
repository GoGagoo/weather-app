import { Togglers } from './App.styled'
import {
	Navbar,
	SearchInput,
	TempToggler,
	ThemeToggler,
	WeatherInfo,
} from './components'

const App = () => (
	<>
		<Navbar>
			<SearchInput />
			<Togglers>
				<ThemeToggler />
				<TempToggler />
			</Togglers>
		</Navbar>
		<WeatherInfo />
	</>
)

export default App
