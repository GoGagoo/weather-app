import { SearchInput } from '../SearchInput/SearchInput'
import { WeatherTopContainer } from './WeatherTop.styled'
import { ThemeTempTogglers } from '../ThemeTempTogglers/ThemeTempTogglers'

export const WeatherTop = () => (
	<WeatherTopContainer>
		<SearchInput />
		<ThemeTempTogglers />
	</WeatherTopContainer>
)
