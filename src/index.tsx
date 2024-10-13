import ReactDOM from 'react-dom/client';
import App from './App'
import { Global } from './styles/globals'
import { ThemeProvider } from './contexts/ThemeContext'

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
