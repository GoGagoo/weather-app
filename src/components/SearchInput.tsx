import { Search } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { api } from '../api'
import { WEATHER_API_KEY } from '../constants/constants'

const SearchInputContainer = styled.div<{ hasdigits: boolean | undefined }>`
	display: flex;
	align-items: center;
	min-width: 148px;
	width: 100%;
	border-bottom: 2px solid ${(props) => (props.hasdigits ? 'red' : '#ffffff6e')};
	transition: border-color 0.1s ease;
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

export const SearchInput = () => {
	const [location, setLocation] = useState('')
	const [hasDigits, setHasDigits] = useState(false)

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

				console.log(weatherDataCall)
				return weatherDataCall
			} catch (error) {
				console.error(error)
				return {}
			}
		}
	}

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		setLocation(inputValue)

		const anyDigitRegExp = /\d/
		setHasDigits(anyDigitRegExp.test(inputValue))
	}

	return (
		<SearchInputContainer hasdigits={hasDigits ? true : undefined}>
			<SearchInputField
				value={location}
				onKeyDown={getWeatherDataBySearch}
				onChange={onInputChange}
				type='search'
				placeholder='E.g Moscow'
			/>
			<Search size={20} color={hasDigits ? 'red' : '#ffffffa6'} />
		</SearchInputContainer>
	)
}
