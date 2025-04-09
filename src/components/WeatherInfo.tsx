import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGeolocation } from '../hooks/useGeolocation'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { fetchWeatherByCity } from '../store/weatherSlice'
import { Loader } from '../uikit'
import { NotFound } from './NotFound/NotFound'
import { WeatherDetails } from './WeatherDetails/WeatherDetails'
import { WeatherDisplay } from './WeatherDisplay/WeatherDisplay'

const delay = 10000

export const WeatherInfo: React.FC = () => {
	const dispatch = useDispatch()
	const { location, geoResolved } = useGeolocation()
	const { data, loading, error } = useTypedSelector((state) => state.weather)

	const [isTimeout, setIsTimeout] = useState(false)

	useEffect(() => {
		if (geoResolved && !location) dispatch(fetchWeatherByCity('Moscow'))
	}, [dispatch, geoResolved, location])

	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null

		if (!loading) {
			timeout = setTimeout(() => {
				if (!data) setIsTimeout(true)
			}, delay)
		}

		return () => {
			if (timeout) clearTimeout(timeout)
		}
	}, [data, loading])

	if (loading) return <Loader />
	if (error || isTimeout) return <NotFound />

	return (
		data && (
			<>
				<WeatherDisplay /> <WeatherDetails />
			</>
		)
	)
}
