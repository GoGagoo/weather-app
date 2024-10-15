import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { api } from '../api'
import { WEATHER_API_KEY } from '../constants/constants'
import { SearchResultList } from './SearchResultList'

const SearchInputContainer = styled.div<{
	hasdigits: boolean | undefined
	errorcity: boolean
}>`
	display: flex;
	align-items: center;
	min-width: 148px;
	width: 100%;
	border-bottom: 2px solid
		${(props) =>
			props.hasdigits ? 'red' : props.errorcity ? 'red' : '#ffffff6e'};
	transition: border-color 0.1s ease;
	position: relative;
`

const SearchInputField = styled.input`
	width: 100%;
	color: rgb(255, 255, 255);
	padding: 10px;
	font-size: 20px;
	border: none;
	outline: none;
	background-color: transparent;

	&::placeholder {
		color: rgb(255, 255, 255, 0.5);
	}

	&::-webkit-search-cancel-button {
		display: none;
	}
`

const ErrorMessage = styled.div`
	color: red;
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: 10px;
	font-size: 14px;
	transition: 0.1s ease;
`

interface City {
	name: string
	country: string
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

	const weatherUnit = 'metric'

	const getWeatherDataBySearch = async (
		e: React.KeyboardEvent<HTMLInputElement>
	): Promise<ReturnType<typeof api.get>> => {
		if (e.key === 'Enter') {
			try {
				const { data } = await api.get(
					`weather?q=${location}&units=${weatherUnit}&appid=${WEATHER_API_KEY}`
				)

				const lat = data.coord.lat
				const lon = data.coord.lon

				const weatherDataCall = await api.get(
					`onecall?lat=${lat}&lon=${lon}&units=${weatherUnit}&appid=${WEATHER_API_KEY}`
				)

				onSearch(location)
				setLocation('')
				setErrorCity(null)
				setErrorDigit(null)
				setShowResults(false)
				return weatherDataCall
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
			const { data } = await api.get(`find?q=${query}&appid=${WEATHER_API_KEY}`)
			setSearchResults(data.list.map((city: any) => ({ name: city.name, country: city.sys.country })))
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
			// Выполняем поиск только если в инпуте более 2 символов
			if (location.length > 3 && !hasDigits) {
				fetchCitySuggestions(location)
			} else {
				setSearchResults([])
				setShowResults(false)
			}
		}, 500) // Задержка в 500 мс
	
		// Очищаем таймер перед установкой нового
		return () => clearTimeout(debounceTimeout)
	}, [location, hasDigits])
	

	const handleSelectCity = (city: string) => {
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
			errorcity={!!errorCity}
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
