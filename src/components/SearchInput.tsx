import { Search } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { api } from '../api'
import { WEATHER_API_KEY } from '../constants/constants'

const SearchInputContainer = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 2px solid #ffffffa6;
	min-width: 148px;
	width: 100%;
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
	const [data, setData] = useState({})
	const [location, setLocation] = useState('')

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

	document.addEventListener('keydown', (event) => {
		const anyDigitRegExp = /\d/

		if (anyDigitRegExp.test(event.key)) {
			event.preventDefault()
			console.log('Отмена цифры: ', event.key)
		}
	})

	return (
		<SearchInputContainer>
			<SearchInputField
				value={location}
				onKeyDown={getWeatherDataBySearch}
				onChange={(e) => setLocation(e.target.value)}
				type='search'
				placeholder='E.g Moscow'
			/>
			<Search size={20} color='#ffffffa6' />
		</SearchInputContainer>
	)
}
