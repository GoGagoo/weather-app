export const getWeatherIcon = (code: number): string => {
	const weatherIcons: { [key: number]: string } = {
		0: 'https://openweathermap.org/img/wn/01d.png', // Clear
		1: 'https://openweathermap.org/img/wn/02d.png', // Partly cloudy
		2: 'https://openweathermap.org/img/wn/03d.png', // Cloudy
		3: 'https://openweathermap.org/img/wn/04d.png', // Overcast
		45: 'https://openweathermap.org/img/wn/09d.png', // Soft rain
		48: 'https://openweathermap.org/img/wn/10d.png', // Heavy rain
		51: 'https://openweathermap.org/img/wn/13d.png', // Drizzle
		61: 'https://openweathermap.org/img/wn/50d.png', // Downpour
		71: 'https://openweathermap.org/img/wn/50d.png', // Snowfall
		80: 'https://openweathermap.org/img/wn/11d.png', // Thunderstorm
		95: 'https://openweathermap.org/img/wn/11d.png', // Heavy thunderstorm
	}

	return weatherIcons[code] || 'https://openweathermap.org/img/wn/01n.png'
}
