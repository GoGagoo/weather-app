import styled from 'styled-components'
import { useTheme } from '../hooks/useTheme'

const DropdownContainer = styled.div`
	background-color: transparent;
`

const Dropdown = styled.select`
	background-color: transparent;
	width: 100px;
	color: rgb(255, 255, 255);
	padding: 8px 4px;
	font-size: 18px;
	line-height: 1.5;
	text-align: left;
	border: 1px solid #ffffff56;
	border-radius: 20px;
	outline: none;

	&:hover {
		background-color: #ffffff56;
		transition: all 0.2s ease-in-out;
	}

	&:disabled {
		cursor: not-allowed;
		background-color: #433e9f;
	}
`

const Options = styled.option`
	font-size: 16px;
	color: #6c63ff;
`

const options = [
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' },
	{ value: 'system', label: 'System' },
]

export const ThemeToggler = () => {
	const { theme, toggleTheme } = useTheme()

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value
    if (selectedTheme !== theme) {
      toggleTheme(selectedTheme)
    }
  }

	return (
		<DropdownContainer>
			<Dropdown
				value={theme}
				onChange={handleChange}
			>
				{options.map((option) => (
					<Options key={option.value} value={option.value}>
						{option.label}
					</Options>
				))}
			</Dropdown>
		</DropdownContainer>
	)
}
