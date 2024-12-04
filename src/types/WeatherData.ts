export type WeatherData = {
	current: {
		wind_speed_10m: number
		relative_humidity_2m: number[]
		precipitation: number
		rain: number
		pressure_msl: number
		apparent_temperature: number
	}
	hourly: {
		time: string[]
		visibility: number[]
		weather_code: string[]
		temperature_2m: number[]
	}
	daily: {
		sunrise: string[]
		sunset: string[]
	}
}

export interface WeatherState {
	data: WeatherData | null | undefined
	city: string | null
	loading: boolean
	error: string | null
	unit: string
	latitude: number | null
	longitude: number | null
	timezone: string | null
	currentTemp: number | null
	forecastData: ForecastItem[]
}

export interface ForecastItem {
	time: string
	icon: JSX.Element
	temperature_2m: number
}