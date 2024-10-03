import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fetchCoordinates, fetchWeatherApi } from '../api'
import {
	fetchWeatherByCity,
	fetchWeatherByCoords,
	fetchWeatherFailure,
	fetchWeatherStart,
	fetchWeatherSuccess,
	setCurrentTemp,
	setForecast,
	setUnit,
} from '../store/weatherSlice'
import { WeatherData } from '../types/WeatherData'
import { getWeatherIcon } from '../utils/getWeatherIcon'

type FetchWeatherByCityAction = {
	type: typeof fetchWeatherByCity.type
	payload: string
}

type FetchWeatherByCoordsAction = {
	type: typeof fetchWeatherByCoords.type
	payload: { latitude: number; longitude: number }
}

type SetUnitAction = {
	type: typeof setUnit.type
}

type WeatherAction =
	| FetchWeatherByCityAction
	| FetchWeatherByCoordsAction
	| SetUnitAction

function processWeatherData(weatherData: WeatherData) {
	if (!weatherData || !weatherData.hourly?.temperature_2m)
		throw new Error('Invalid weather data')

	const timezone = weatherData.timezone || 'auto'
	const localTime = new Date().toLocaleString('en-US', { timeZone: timezone })
	const currentTimeInCity = new Date(localTime).getTime()

	const forecastTimes = weatherData.hourly.time.map((time: string) =>
		new Date(
			new Date(time).toLocaleString('en-US', { timeZone: timezone })
		).getTime()
	)

	const closestForecastIndex = forecastTimes.findIndex(
		(forecastTime: number) => forecastTime > currentTimeInCity - 60 * 60 * 1000
	)

	if (closestForecastIndex === -1)
		throw new Error('No forecast data available for the current hour')

	const forecast = weatherData.hourly.time.map(
		(time: string, index: number) => ({
			time: new Intl.DateTimeFormat('en-US', {
				hour: 'numeric',
				hour12: true,
				timeZone: timezone,
			})
				.format(new Date(time))
				.replace('AM', 'am')
				.replace('PM', 'pm'),
			temperature_2m: weatherData.hourly.temperature_2m[index],
			icon: getWeatherIcon(
				Number(weatherData.hourly.weather_code?.[index]) || 0
			),
		})
	)

	return {
		slicedForecast: forecast.slice(closestForecastIndex),
		currentTemperature:
			weatherData.hourly.temperature_2m[closestForecastIndex] || null,
		fullWeatherData: weatherData,
	}
}

function* fetchWeatherWorker(action: WeatherAction): Generator {
	try {
		yield put(fetchWeatherStart())

		let latitude: number, longitude: number, unit: string

		const state: {
			weather: { unit: string; latitude?: number; longitude?: number }
		} = yield select((state) => state)
		unit = state.weather.unit

		if (action.type === setUnit.type) {
			latitude = state.weather.latitude!
			longitude = state.weather.longitude!
		} else {
			if (typeof action.payload === 'string') {
				const geoData: { results?: { latitude: number; longitude: number }[] } =
					yield call(fetchCoordinates, action.payload)
				if (!geoData?.results?.length) throw new Error('City not found')

				latitude = geoData.results[0].latitude
				longitude = geoData.results[0].longitude
			} else {
				latitude = action.payload.latitude
				longitude = action.payload.longitude
			}
		}

		const weatherData: WeatherData = yield call(fetchWeatherApi, {
			latitude,
			longitude,
			unit,
			timezone: 'auto',
		})

		const { slicedForecast, currentTemperature, fullWeatherData } =
			processWeatherData(weatherData)
		yield put(setCurrentTemp(currentTemperature))
		yield put(setForecast(slicedForecast))
		yield put(fetchWeatherSuccess(fullWeatherData))
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error fetching weather:', error.message)
			yield put(fetchWeatherFailure(error.message))
		} else {
			yield put(fetchWeatherFailure('An unknown error occurred'))
		}
	}
}

export function* weatherWatcher() {
	yield takeEvery(fetchWeatherByCoords.type, fetchWeatherWorker)
	yield takeEvery(fetchWeatherByCity.type, fetchWeatherWorker)
	yield takeEvery(setUnit.type, fetchWeatherWorker)
}
