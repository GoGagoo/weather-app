import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { ThemeProvider } from './contexts/ThemeContext'
import store from './store/store'
import { Global } from './styles/globals'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)

root.render(
	<Provider store={store}>
		<ThemeProvider>
			<Global />
			<App />
		</ThemeProvider>
	</Provider>
)
