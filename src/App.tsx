import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { api } from './api'
import {
	Navbar,
	SearchInput,
	TempToggler,
	ThemeToggler,
	WeatherInfo,
} from './components'
import { WEATHER_API_KEY } from './constants/constants'
import { WeatherData } from './types/WeatherData'
import { Loader } from './uikit'

const Togglers = styled.div`
	display: flex;
	align-items: 'center';
	gap: 20px;
`

const App: React.FC = () => {
  const [unit, setUnit] = useState('metric')
  const [city, setCity] = useState('Moscow')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = async (newCity: string) => {
    setCity(newCity)
    fetchWeather(newCity)
  }

  const fetchWeather = async (newCity: string) => {
    setLoading(true)

    try {
      const { data } = await api.get(
        `weather?q=${newCity}&units=${unit}&appid=${WEATHER_API_KEY}`
      )

      const lat = data.coord.lat
      const lon = data.coord.lon

      const weatherDataCall = await api.get(
        `onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`
      )

      setWeatherData(weatherDataCall.data)
    } catch (error) {
      console.error(error)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true)

    try {
      const geoResponse = await api.get(
        `weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`
      )

      const newCity = geoResponse.data.name
      setCity(newCity)

      const weatherDataCall = await api.get(
        `onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`
      )

      setWeatherData(weatherDataCall.data)
    } catch (error) {
      console.error(error)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchInitialWeatherData = async () => {
      setLoading(true)

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            fetchWeatherByCoords(lat, lon)
          },
          (error) => {
            console.error('Ошибка получения местоположения', error)
            fetchWeather('Moscow')
          }
        )
      } else {
        fetchWeather('Moscow')
      }
    }

    fetchInitialWeatherData()
  }, [unit])

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
        <WeatherInfo city={city} data={weatherData} unit={unit} />
      ) : null}
    </>
  )
}

export default App
