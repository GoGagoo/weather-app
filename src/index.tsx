import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './contexts/ThemeContext'
import { Global } from './styles/globals'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)

root.render(
	<ThemeProvider>
		<>
			<Global />
			<App />
		</>
	</ThemeProvider>
)
