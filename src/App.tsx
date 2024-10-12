import styled from 'styled-components'
import {
	Navbar,
	SearchInput,
	TempToggler,
	WeatherInfo,
	ThemeToggler
} from './components'
import { useState } from 'react'

const Togglers = styled.div`
	display: flex;
	align-items: 'center';
	gap: 20px;
`

const App: React.FC = () => {
	const [unit, setUnit] = useState('metric')

	return (
		<>
			<Navbar>
				<SearchInput />
				<Togglers>
					<ThemeToggler />
					<TempToggler onUnitChange={setUnit} />
				</Togglers>
			</Navbar>
			<WeatherInfo unit={unit} />
		</>
	)
}

export default App
