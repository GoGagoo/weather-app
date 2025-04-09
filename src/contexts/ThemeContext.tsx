import { createContext, useEffect, useState } from 'react'

interface Props {
	theme: string
	toggleTheme: (e: string) => void
}

const ThemeContext = createContext<Props>({
	theme: 'light',
	toggleTheme: (e: string) => {},
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<string>('light')

	const getSystemTheme = () => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	}

	useEffect(() => {
		const storedTheme = localStorage.getItem('currentTheme')
		if (storedTheme) {
			if (storedTheme === 'system') {
				const systemTheme = getSystemTheme()
				setTheme('system')
				document.body.classList.add(systemTheme)
			} else {
				setTheme(storedTheme)
				document.body.classList.add(storedTheme)
			}
		} else {
			const systemTheme = getSystemTheme()
			setTheme('system')
			document.body.classList.add(systemTheme)
		}
	}, [])

	useEffect(() => {
		if (theme === 'system') {
			const systemTheme = getSystemTheme()
			document.body.className = ''
			document.body.classList.add(systemTheme)
		} else {
			document.body.className = ''
			document.body.classList.add(theme)
		}

		localStorage.setItem('currentTheme', theme)
	}, [theme])

	const toggleTheme = (newTheme: string) => {
		setTheme(newTheme)
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export { ThemeContext, ThemeProvider }
