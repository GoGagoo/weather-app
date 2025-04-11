import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { OPEN_CAGE_DATA_URL } from '../constants/constants'
import { OPEN_CAGE_DATA_KEY } from '../config'
import { fetchWeatherByCoords, setCoordinates } from '../store/weatherSlice'

export const useGeolocation = () => {
	const dispatch = useDispatch()

	const [geoResolved, setGeoResolved] = useState(false)
	const [location, setLocation] = useState<{
		latitude: number
		longitude: number
	} | null>(null)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords
				try {
					const res = await axios.get(OPEN_CAGE_DATA_URL, {
						params: {
							q: `${latitude},${longitude}`,
							key: OPEN_CAGE_DATA_KEY,
							language: 'en',
							no_annotations: 1,
						},
					})

					const components = res.data.results[0]?.components || {}

					const city =
						components.city ||
						components.town ||
						components.village ||
						'Unknown'

					dispatch(
						setCoordinates({ latitude, longitude, timezone: 'auto', city })
					)
					dispatch(fetchWeatherByCoords({ latitude, longitude }))
					setLocation({ latitude, longitude })
				} catch (error) {
					console.error('Ошибка получения города:', error)
				}

				setGeoResolved(true)
			},
			(error) => {
				console.error('Ошибка геолокации:', error)
				setGeoResolved(true)
			}
		)
	}, [dispatch])

	return { location, geoResolved }
}
