import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchCoordinatesApi, fetchWeatherApi } from '../api'
import {
	fetchWeatherByCity,
	fetchWeatherByCoords,
	fetchWeatherFailure,
	fetchWeatherStart,
	fetchWeatherSuccess,
	setCity,
	setCoordinates,
	setCurrentTemp,
	setForecast,
} from '../store/weatherSlice'
import { ForecastItem, WeatherData } from '../types/WeatherData'
import { getWeatherIcon } from '../utils/getWeatherIcon'

function* fetchWeatherWorker(
	action: ReturnType<typeof fetchWeatherByCity>
): Generator {
	try {
		yield put(fetchWeatherStart())
		const geoData = yield call(fetchCoordinatesApi, action.payload)

		if (!geoData.results || geoData.results.length === 0) {
			yield put(fetchWeatherFailure('City not found or API error'))
			return
		}

		const { latitude, longitude, timezone, name } = geoData.results[0]
		yield put(setCoordinates({ latitude, longitude, timezone }))
		yield put(setCity(name))

		const weatherData: WeatherData = yield call(fetchWeatherApi, {
			latitude,
			longitude,
			unit: 'celsius',
			timezone: 'auto',
		})

		if (
			!weatherData ||
			!weatherData.current ||
			!weatherData.hourly ||
			!weatherData.daily
		) {
			throw new Error('Weather data is missing')
		}

		const localTime = new Date(
			new Date().toLocaleString('en-US', { timeZone: timezone || 'auto' })
		).getTime()

		const forecastTimes = weatherData.hourly.time.map((time: string) => {
			return new Date(
				new Date(time).toLocaleString('en-US', { timeZone: timezone || 'auto' })
			).getTime()
		})

		const closestForecastIndex = forecastTimes.findIndex(
			(forecastTime) => forecastTime >= localTime
		)

		if (closestForecastIndex === -1) {
			throw new Error('No forecast data available for the current hour')
		}

		const currentTemperature =
			weatherData.hourly.temperature_2m[closestForecastIndex] || null
		yield put(setCurrentTemp(currentTemperature))

		const forecast: ForecastItem[] = weatherData.hourly.time.map(
			(time: string, index: number) => {
				const temp = weatherData.hourly.temperature_2m[index]
				const weatherCode = Number(weatherData.hourly.weather_code[index])

				const formattedTime = new Intl.DateTimeFormat('en-GB', {
					hour: 'numeric',
					hour12: true,
					timeZone: timezone || 'auto',
				}).format(new Date(time))

				return {
					time: formattedTime,
					temperature_2m: temp,
					icon: getWeatherIcon(weatherCode),
				}
			}
		)

		yield put(setCity(name))
		yield put(setForecast(forecast.slice(closestForecastIndex)))
		yield put(fetchWeatherSuccess(weatherData))
	} catch (error: any) {
		console.error('Error fetching weather:', error.message)
		yield put(fetchWeatherFailure(error.message))
	}
}

function* fetchWeatherByCoordsWorker(
	action: ReturnType<typeof fetchWeatherByCoords>
): Generator {
	try {
		yield put(fetchWeatherStart())
		const { latitude, longitude } = action.payload
		const weatherData = yield call(fetchWeatherApi, {
			latitude,
			longitude,
			unit: 'celsius',
			timezone: 'auto',
		})
		yield put(fetchWeatherSuccess(weatherData))
	} catch (error: any) {
		yield put(fetchWeatherFailure(error.message))
	}
}

export function* weatherWatcher() {
	yield takeEvery(fetchWeatherByCity.type, fetchWeatherWorker)
	yield takeEvery(fetchWeatherByCoords.type, fetchWeatherByCoordsWorker)
}
