import React from 'react'
import {
	Navbar,
	SearchInput,
	TempToggler,
	WeatherDetails,
	WeatherDisplay,
} from './components'

const App: React.FC = () => {
	return (
		<div>
			<Navbar>
				<SearchInput />
				<TempToggler />
			</Navbar>
			<WeatherDisplay />
			<WeatherDetails />
		</div>
	)
}

export default App
