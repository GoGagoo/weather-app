import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TODOS_LOCAL_STORAGE_TEMP_UNIT } from '../constants/constants'
import { ForecastItem, WeatherData, WeatherState } from '../types/WeatherData'

const unitStorage = localStorage.getItem(TODOS_LOCAL_STORAGE_TEMP_UNIT)

const initialState: WeatherState = {
	data: null,
	city: 'Unknown City',
	loading: false,
	isGeoLocationSet: false,
	error: null,
	unit: unitStorage || 'celsius',
	latitude: null,
	longitude: null,
	timezone: null,
	currentTemp: null,
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
			localStorage.setItem(TODOS_LOCAL_STORAGE_TEMP_UNIT, action.payload)

			if (state.latitude !== null && state.longitude !== null)
				state.loading = true
		},
		setCoordinates(
			state,
			action: PayloadAction<{
				latitude: number
				longitude: number
				timezone: string | null
				city?: string
			}>
		) {
			state.latitude = action.payload.latitude
			state.longitude = action.payload.longitude
			state.timezone = action.payload.timezone || 'auto'
			state.city = action.payload.city || state.city
			state.isGeoLocationSet = true
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
