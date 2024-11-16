import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getWeatherData } from './api'
import {
	Navbar,
	SearchInput,
	TempToggler,
	ThemeToggler,
	WeatherInfo,
} from './components'
import { WeatherData } from './types/WeatherData'
import { Loader } from './uikit'
import { Togglers } from './App.styled'

const App: React.FC = () => {
	const [unit, setUnit] = useState('celsius')
	const [city, setCity] = useState('Moscow')
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [latitude, setLatitude] = useState<number | null>(null)
	const [longitude, setLongitude] = useState<number | null>(null)
	const [timezone, setTimezone] = useState<string | null>(null)

	const fetchUserLocation = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords
					setLatitude(latitude)
					setLongitude(longitude)

					await fetchWeatherByCoords(latitude, longitude)
				},
				async (error) => {
					console.warn(
						'Geolocation rejected, showing the weather in Moscow.',
						error
					)
					await fetchWeather('Moscow')
				}
			)
		} else {
			console.warn('Geolocation rejected, showing the weather in Moscow.')
			fetchWeather('Moscow')
		}
	}

	const handleSearch = async (newCity: string) => {
		setCity(newCity)
		fetchWeather(newCity)
	}

	const fetchWeather: any = async (newCity: string) => {
		setLoading(true)

		try {
			const geoResponse = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${newCity}&count=1&language=en`
			)

			const geoData = await geoResponse.json()

			if (!geoData || !geoData.results || geoData.results.length === 0) {
				throw new Error('Город не найден.')
			}


			const { name, latitude, longitude, timezone } = geoData.results[0]
			setCity(name)
			setLatitude(latitude)
			setLongitude(longitude)
			setTimezone(timezone)

			const weatherResponse = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,pressure_msl,wind_speed_10m&hourly=temperature_2m,visibility&daily=sunrise,sunset&timezone=${
					timezone || 'auto'
				}&temperature_unit=${unit}`
			)

			const weatherData = await weatherResponse.json()

			setWeatherData(weatherData)
		} catch (error) {
			console.error(error)
			setWeatherData(null)
		} finally {
			setLoading(false)
		}
	}

	const fetchCityName = async (lat: number, lon: number): Promise<string> => {
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&accept-language=en`
			)

			if (!response.ok) {
				throw new Error(`Ошибка запроса: ${response.status}`)
			}

			const data = await response.json()

			if (data && data.address && data.address.city) {
				return data.address.city
			} else {
				console.warn('Город не найден для указанных координат.')
				return 'Unknown City'
			}
		} catch (error) {
			console.error('Ошибка получения названия города:', error)
			return 'Unknown City'
		}
	}

	const fetchWeatherByCoords = async (lat: number, lon: number) => {
		if (lat === undefined || lon === undefined) {
			console.error('Широта или долгота не определены')
			return
		}
		setLoading(true)

		try {
			const cityName = await fetchCityName(lat, lon)
			setCity(cityName)

			const weatherData = await getWeatherData(lat, lon)
			setWeatherData(weatherData)
		} catch (error) {
			console.error('Ошибка получения данных:', error)
			setWeatherData(null)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUserLocation()
	}, [])

	return (
		<>
			<Navbar>
				<SearchInput onSearch={handleSearch} />
				<Togglers>
					<ThemeToggler />
					<TempToggler onUnitChange={setUnit} />
				</Togglers>
			</Navbar>
			{loading ? (
				<Loader />
			) : weatherData ? (
				<WeatherInfo
					lat={latitude}
					lon={longitude}
					city={city}
					data={weatherData}
					unit={unit}
					timezone={timezone}
				/>
			) : null}
		</>
	)
}

export default App
