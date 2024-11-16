import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	GEOCODING_URL,
	OPEN_METEO_FORECAST_URL,
} from '../../constants/constants'
import { SearchResultList } from '../SearchResultList/SearchResultList'
import {
	ErrorMessage,
	SearchInputContainer,
	SearchInputField,
} from './SearchInput.styled'

interface City {
	name: string
}

interface Props {
	onSearch: (city: string) => void
}

export const SearchInput: React.FC<Props> = ({ onSearch }) => {
	const [location, setLocation] = useState('')
	const [hasDigits, setHasDigits] = useState(false)
	const [errorCity, setErrorCity] = useState<string | null>(null)
	const [errorDigit, setErrorDigit] = useState<string | null>(null)
	const [searchResults, setSearchResults] = useState<City[]>([])
	const [showResults, setShowResults] = useState(false)
	const [selectedCity, setSelectedCity] = useState<string | null>(null)

	const getWeatherDataBySearch = async (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Enter') {
			try {
				const cityToSearch = selectedCity || location
				const geoResponse = await fetch(`${GEOCODING_URL}?name=${cityToSearch}`)

				if (!geoResponse.ok) {
					throw new Error('Ошибка сети при запросе города.')
				}

				const geoData = await geoResponse.json()

				if (!geoData.results || geoData.results.length === 0) {
					throw new Error('Город не найден.')
				}

				const { latitude, longitude, timezone } = geoData.results[0]

				const weatherResponse = await fetch(
					`${OPEN_METEO_FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${
						timezone || 'auto'
					}`
				)

				if (!weatherResponse.ok) {
					throw new Error('Ошибка сети при запросе погоды.')
				}

				const weatherData = await weatherResponse.json()

				onSearch(cityToSearch)
				setLocation('')
				setErrorCity(null)
				setErrorDigit(null)
				setShowResults(false)

				return weatherData
			} catch (error) {
				console.error(error)
				setErrorCity('City not found. Please try again.')
				setErrorDigit(null)
				setSearchResults([])
				return {}
			}
		}
	}

	const fetchCitySuggestions = async (query: string) => {
		try {
			const geoResponse = await fetch(`${GEOCODING_URL}?name=${query}&count=5`)

			if (!geoResponse.ok) {
				throw new Error('Ошибка сети при запросе подсказок.')
			}

			const geoData = await geoResponse.json()

			if (!geoData.results || geoData.results.length === 0) {
				setSearchResults([])
				return
			}

			const suggestions = geoData.results.map((city: any) => ({
				name: city.name,
			}))

			setSearchResults(suggestions)
			setShowResults(true)
		} catch (error) {
			console.error(error)
		}
	}

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		setLocation(inputValue)

		const anyDigitRegExp = /\d/
		if (anyDigitRegExp.test(inputValue)) {
			setHasDigits(true)
			setErrorDigit('Enter the name of the city, no numbers allowed.')
			setErrorCity(null)
			setSearchResults([])
		} else {
			setHasDigits(false)
			setErrorDigit(null)
			if (inputValue.length > 3) {
				fetchCitySuggestions(inputValue)
			} else {
				setSearchResults([])
				setShowResults(false)
			}
		}
	}

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			if (location.length > 3 && !hasDigits) {
				fetchCitySuggestions(location)
			} else {
				setSearchResults([])
				setShowResults(false)
			}
		}, 500)

		return () => clearTimeout(debounceTimeout)
	}, [location, hasDigits])

	const handleSelectCity: any = (city: string) => {
		setSelectedCity(city)
		onSearch(city)
		setLocation(city)
		setSearchResults([])
		setShowResults(false)
	}

	const handleCloseList = () => {
		setShowResults(false)
	}

	return (
		<SearchInputContainer
			$errorcity={!!errorCity}
			hasdigits={hasDigits ? true : undefined}
		>
			<SearchInputField
				value={location}
				onKeyDown={getWeatherDataBySearch}
				onChange={onInputChange}
				type='search'
				placeholder='E.g Moscow'
			/>
			<Search size={20} color={hasDigits || errorCity ? 'red' : '#ffffffa6'} />
			{errorCity && <ErrorMessage>{errorCity}</ErrorMessage>}
			{hasDigits && <ErrorMessage>{errorDigit}</ErrorMessage>}
			{showResults && searchResults.length > 0 && location.length > 0 && (
				<SearchResultList
					results={searchResults}
					onSelect={handleSelectCity}
					onCloseList={handleCloseList}
				/>
			)}
		</SearchInputContainer>
	)
}
