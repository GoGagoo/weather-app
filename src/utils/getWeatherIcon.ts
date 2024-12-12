export const getWeatherIcon = (code: number): string => {
	const weatherIcons: { [key: number]: string } = {
		0: 'https://openweathermap.org/img/wn/01d.png', // Ясно
		1: 'https://openweathermap.org/img/wn/02d.png', // Частично облачно
		2: 'https://openweathermap.org/img/wn/03d.png', // Облачно
		3: 'https://openweathermap.org/img/wn/04d.png', // Пасмурно
		45: 'https://openweathermap.org/img/wn/09d.png', // Легкий дождь
		48: 'https://openweathermap.org/img/wn/10d.png', // Сильный дождь
		51: 'https://openweathermap.org/img/wn/13d.png', // Морось
		61: 'https://openweathermap.org/img/wn/50d.png', // Ливень
		71: 'https://openweathermap.org/img/wn/50d.png', // Снегопад
		80: 'https://openweathermap.org/img/wn/11d.png', // Гроза
		95: 'https://openweathermap.org/img/wn/11d.png', // Сильная гроза
	}

	return weatherIcons[code] || 'https://openweathermap.org/img/wn/01n.png'
}
