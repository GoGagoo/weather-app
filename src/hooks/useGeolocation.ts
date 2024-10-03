import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
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
					const res = await axios.get(
						`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
					)
					const city =
						res.data.address?.city || res.data.address?.town || 'Unknown'

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
