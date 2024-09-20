import { Slash } from 'lucide-react'
import React from 'react'
import styled from 'styled-components'

const TempTogglerContainer = styled.div`
	width: 168px;
	height: 38px;
	display: flex;
	justify-content: center;
	align-items: center;
	`

const TempTogglerBtn = styled.button`
	padding: 8px 36px;
	border: none;
	cursor: pointer;
	border-radius: 20px;
	display: flex;
  justify-content: center;
	align-items: center; 

	&:hover {
		background-color: rgb(230, 233, 238);
		transition: 150ms;
	}
`

const TempTogglerLetters = styled.span`
	font-size: 18px;
	font-weight: bold;
	color: #13264A33;

	&:hover {
		color: rgb(230, 233, 238);
		transition: 150ms;
	}
`

export const TempToggler = () => {
	return (
		<TempTogglerContainer>
			<TempTogglerBtn>
				<TempTogglerLetters>C  <Slash size={18} />  F</TempTogglerLetters>
			</TempTogglerBtn>
		</TempTogglerContainer>
	)
}
