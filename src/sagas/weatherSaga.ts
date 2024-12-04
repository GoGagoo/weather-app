import { call, put, takeEvery } from 'redux-saga/effects'
import { GEOCODING_URL, OPEN_METEO_FORECAST_URL } from '../constants/constants'
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

type WeatherApiParams = {
	latitude: number
	longitude: number
	unit: string
	timezone: string
}

function fetchCoordinatesApi(city: string) {
	const url = `${GEOCODING_URL}?name=${city}&count=1&language=en`
	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`)
			}
			return res.json()
		})
		.then((data) => {
			return data
		})
}

function fetchWeatherApi(params: WeatherApiParams): Promise<WeatherData> {
	const { latitude, longitude, unit, timezone } = params
	const url = `${OPEN_METEO_FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,pressure_msl,wind_speed_10m&hourly=temperature_2m,weather_code,visibility&daily=sunrise,sunset&timezone=${
		timezone || 'auto'
	}&temperature_unit=${unit}`

	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`)
			}
			return res.json()
		})
		.then((data) => {
			return data
		})
}

function* fetchWeatherWorker(
	action: ReturnType<typeof fetchWeatherByCity>
): Generator {
	try {
		yield put(fetchWeatherStart())
		const geoData = yield call(fetchCoordinatesApi, action.payload)

		if (!geoData.results || geoData.results.length === 0) {
			throw new Error('City not found')
		}

		const { latitude, longitude, timezone, name } = geoData.results[0]
		yield put(setCoordinates({ latitude, longitude, timezone }))
		yield put(setCity(name))

		const weatherData: WeatherData = yield call(fetchWeatherApi, {
			latitude,
			longitude,
			unit: 'celsius',
			timezone,
		})

		console.log('Weather Data:', weatherData)

		if (!weatherData || !weatherData.current || !weatherData.hourly) {
			throw new Error('Weather data is missing')
		}

		const currentTimeUTC = Date.now()
		const closestForecastIndex = weatherData.hourly.time.findIndex(
			(time: string) => new Date(time).getTime() > currentTimeUTC
		)

		if (closestForecastIndex === -1) {
			throw new Error('No forecast data available for the current time')
		}

		const currentTemperature =
			weatherData.hourly.temperature_2m[closestForecastIndex] || null
		yield put(setCurrentTemp(currentTemperature))

		const forecast: ForecastItem[] = weatherData.hourly.time.map(
			(time: string, index: number) => {
				const temp = weatherData.hourly.temperature_2m[index]
				const weatherCode = Number(weatherData.hourly.weather_code[index])
		
				// Преобразуем время в локальный часовой пояс пользователя
				const localTime = new Date(time).toLocaleTimeString('en-GB', {
					hour: 'numeric',
					hour12: true,
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Получаем текущий часовой пояс пользователя
				})
		
				return {
					time: localTime,
					temperature_2m: temp,
					icon: getWeatherIcon(weatherCode),
				}
			}
		)

		yield put(setForecast(forecast.slice(closestForecastIndex)))
		console.log(forecast.slice(closestForecastIndex))
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



export function* watchFetchWeather() {
	yield takeEvery(fetchWeatherByCity.type, fetchWeatherWorker)
	yield takeEvery(fetchWeatherByCoords.type, fetchWeatherByCoordsWorker)
}
