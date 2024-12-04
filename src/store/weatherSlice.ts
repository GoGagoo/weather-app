import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ForecastItem, WeatherData, WeatherState } from '../types/WeatherData'

const initialState: WeatherState = {
	data: null,
	city: '',
	loading: false,
	error: null,
	unit: 'celsius',
	latitude: null,
	longitude: null,
	timezone: null,
	currentTemp: 0,
	forecastData: [],
}

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		fetchWeatherStart(state) {
			state.loading = true
			state.error = null
		},
		fetchWeatherSuccess(state, action: PayloadAction<WeatherData>) {
			state.loading = false
			state.data = action.payload
			state.error = null
		},
		fetchWeatherFailure(state, action: PayloadAction<string>) {
			state.loading = false
			state.error = action.payload
		},
		setUnit(state, action: PayloadAction<string>) {
			state.unit = action.payload
		},
		setCoordinates(
			state,
			action: PayloadAction<{
				latitude: number
				longitude: number
				timezone: string | null
			}>
		) {
			state.latitude = action.payload.latitude
			state.longitude = action.payload.longitude
			state.timezone = action.payload.timezone || 'auto'
		},
		fetchWeatherByCity(state, action: PayloadAction<string>) {
			state.city = action.payload
			state.loading = true
		},
		fetchWeatherByCoords(
			state,
			action: PayloadAction<{ latitude: number; longitude: number }>
		) {
			const { latitude, longitude } = action.payload
			state.latitude = latitude
			state.longitude = longitude
			state.loading = true
		},
		setCity(state, action: PayloadAction<string>) {
			state.city = action.payload
		},
		setForecast(state, action: PayloadAction<ForecastItem[]>) {
			state.forecastData = action.payload
		},
		setCurrentTemp(state, action: PayloadAction<number | null>) {
			state.currentTemp = action.payload
		},
	},
})

export const {
	fetchWeatherStart,
	fetchWeatherSuccess,
	fetchWeatherFailure,
	setUnit,
	setCoordinates,
	fetchWeatherByCity,
	fetchWeatherByCoords,
	setCity,
	setForecast,
	setCurrentTemp,
} = weatherSlice.actions
export default weatherSlice.reducer
