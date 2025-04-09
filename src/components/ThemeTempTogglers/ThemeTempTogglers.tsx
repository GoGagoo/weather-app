import { TempToggler } from '../TempToggler/TempToggler'
import { ThemeToggler } from '../ThemeToggler/ThemeToggler'
import { ThemeTempTogglersContainer } from './ThemeTempTogglers.styled'

export const ThemeTempTogglers = () => (
	<ThemeTempTogglersContainer>
		<ThemeToggler />
		<TempToggler />
	</ThemeTempTogglersContainer>
)
