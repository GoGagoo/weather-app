import React from 'react'
import { SearchInput, Navbar, TempToggler, WeatherDisplay } from './components'

const App: React.FC = () => {
	return (
		<div>
			<Navbar>
				<SearchInput />
				<TempToggler />
			</Navbar>
			<WeatherDisplay />
		</div>
	)
}

export default App
