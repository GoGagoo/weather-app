import ReactDOM from 'react-dom'
import App from './App'
import { Global } from './styles/globals'
import { ThemeProvider } from './contexts/ThemeContext'

ReactDOM.render(
	<ThemeProvider>
		<>
		<Global />
		<App />
		</>
	</ThemeProvider>,
	document.getElementById('root')
)
