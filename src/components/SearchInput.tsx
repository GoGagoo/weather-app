import axios from 'axios'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { BASE_URL, WEATHER_API_KEY } from '../constants/constants'

const SearchInputContainer = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 2px solid #ffffffa6;
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

	const searchLocation = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			try {
				await axios
					.get(`${BASE_URL}/weather?q=${location}&appid=${WEATHER_API_KEY}`)
					.then((res) => {
						setData(res.data)
						console.log(res.data)
					})
			} catch (err) {
				console.log('Error: ', err)
			}
			setLocation('')
		}
	}

	return (
		<SearchInputContainer>
			<SearchInputField
				value={location}
				onKeyDown={searchLocation}
				onChange={(e) => setLocation(e.target.value)}
				type='search'
				placeholder='E.g Yerevan'
			/>
			<Search size={20} color='#ffffffa6' />
		</SearchInputContainer>
	)
}
