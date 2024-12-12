import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWeatherByCity, fetchWeatherByCoords } from '../store/weatherSlice'

export const useGeolocation = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		if (!navigator.geolocation) {
			console.warn('Geolocation is not supported by your browser')
			dispatch(fetchWeatherByCity('Oslo'))
			return
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords
				dispatch(fetchWeatherByCoords({ latitude, longitude })) 
			},
			(error) => {
				console.error('Error getting location:', error)
				dispatch(fetchWeatherByCity('Oslo'))
			},
			{ timeout: 4000 } 
		)
	}, [dispatch])
}
