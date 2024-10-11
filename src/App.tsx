import styled from 'styled-components'
import {
	Navbar,
	SearchInput,
	TempToggler,
	WeatherInfo,
	ThemeToggler
} from './components'

const Togglers = styled.div`
	display: flex;
	align-items: 'center';
	gap: 20px;
`

const App: React.FC = () => {
	return (
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
}

export default App
