export type WeatherData = {
	current: {
		wind_speed_10m: number
		relative_humidity_2m: number[]
		precipitation: number
		rain: number
		pressure_msl: number
		temperature_2m: number
		apparent_temperature: number
	}
	hourly: {
		visibility: number[]
		temperature_2m: number
	}
	daily: {
		sunrise: string[] | any
		sunset: string[] | any
	}
}
