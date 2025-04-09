import { weatherIcons } from '../../public/weather-icons/index'

export const getWeatherIcon = (code: number): string => {
	const iconMap: Record<number, string> = {
    0: weatherIcons.clear,
    1: weatherIcons.partlyCloudy,
    2: weatherIcons.cloudy,
    3: weatherIcons.overcast,
    4: weatherIcons.softRain,
    5: weatherIcons.heavyRain,
    6: weatherIcons.drizzle,
    7: weatherIcons.snowfall,
    8: weatherIcons.thunderstorm,
	}

	return iconMap[code] || weatherIcons.clear
}
