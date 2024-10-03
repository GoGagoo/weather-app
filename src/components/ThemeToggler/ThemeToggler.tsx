import { useTheme } from '../../hooks/useTheme'
import { Select } from '../../uikit'
import { Options } from './ThemeToggler.styled'

const options = [
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' },
	{ value: 'system', label: 'System' },
]

export const ThemeToggler = () => {
	const { theme, toggleTheme } = useTheme()

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTheme = event.target.value
		if (selectedTheme !== theme) toggleTheme(selectedTheme)
	}

	return (
		<Select value={theme} onChange={handleChange}>
			{options.map((option) => (
				<Options key={option.value} value={option.value}>
					{option.label}
				</Options>
			))}
		</Select>
	)
}
