import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SearchInputIcons } from '../../components/SearchInputIcons/SearchInputIcons'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
	clearSearch,
	searchCitiesStart,
	setQuery,
} from '../../store/searchSlice'
import { fetchWeatherByCity } from '../../store/weatherSlice'
import { Input } from '../../uikit'
import { SearchResultList } from '../SearchResultList/SearchResultList'
import {
	ErrorMessage,
	SearchInputContainer,
	StyledXIcon,
} from './SearchInput.styled'

export const SearchInput = () => {
	const dispatch = useDispatch()
	const { query, results, error } = useTypedSelector((state) => state.search)

	const [hasCharacters, setHasCharacters] = useState(false)

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value

		dispatch(setQuery(inputValue))

		const forbiddenCharsRegExp = /[\d?!.,:;<>@#$%^&*()_=+[\]{}\\/|`~"']/

		if (forbiddenCharsRegExp.test(inputValue)) {
			setHasCharacters(true)
		} else {
			setHasCharacters(false)
			if (inputValue.length > 3) {
				dispatch(searchCitiesStart(inputValue))
			} else {
				dispatch(clearSearch())
			}
		}
	}

	const handleSelectCity = (city: string) => {
		dispatch(fetchWeatherByCity(city))
		dispatch(clearSearch())
	}

	const handleCloseList = () => {
		dispatch(clearSearch())
	}

	const handleClearSearchQuery = () => {
		dispatch(clearSearch())
	}

	const handleVoiceInput = (transcript: string) => {
		dispatch(setQuery(transcript))
		
		if (transcript.length > 1) {
			dispatch(searchCitiesStart(transcript))
		} else {
			dispatch(clearSearch())
		}
	}

	return (
		<SearchInputContainer
			$errorcity={!!error}
			$hasdigits={hasCharacters ? true : undefined}
		>
			<Input
				defaultValue={query}
				onChange={onInputChange}
				type='search'
				placeholder='E.g Moscow'
			/>
			{query.length > 0 ? (
				<StyledXIcon
					onClick={handleClearSearchQuery}
					size={20}
					color={hasCharacters || error ? 'red' : '#ffffffa6'}
				/>
			) : (
				<SearchInputIcons
					onVoiceInput={handleVoiceInput}
					size={20}
					color={hasCharacters || error ? 'red' : '#ffffffa6'}
				/>
			)}
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{hasCharacters && (
				<ErrorMessage>
					Enter the name of the city, numbers or other characters are not
					allowed.
				</ErrorMessage>
			)}
			{results.length > 0 && query.length > 0 && (
				<SearchResultList
					results={results}
					onSelect={handleSelectCity}
					onCloseList={handleCloseList}
				/>
			)}
		</SearchInputContainer>
	)
}
