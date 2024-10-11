import { Slash } from 'lucide-react'
import styled from 'styled-components'

const TempTogglerContainer = styled.div`
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

const CelsiusFirstLetter = styled.p`
	display: flex;
	font-size: 18px;
	font-weight: bold;
	margin-right: 5px; 
	color: #23C5BA;
`

const FahrenheitFirstLetter = styled.p`
	display: flex;
	font-size: 18px;
	font-weight: bold;
	color: #13264A33;
	margin-left: 5px; 
`

export const TempToggler = () => {
	return (
		<TempTogglerContainer>
			<TempTogglerBtn>
				<CelsiusFirstLetter>C</CelsiusFirstLetter>
					<Slash size={18} />
					<FahrenheitFirstLetter>F</FahrenheitFirstLetter>
			</TempTogglerBtn>
		</TempTogglerContainer>
	)
}
