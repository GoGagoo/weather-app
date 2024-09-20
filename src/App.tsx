import React from 'react'
import { SearchInput, Navbar, TempToggler } from './components'

const App: React.FC = () => {
	return (
		<div>
			<Navbar>
				<SearchInput />
				<TempToggler />
			</Navbar>
		</div>
	)
}

export default App
