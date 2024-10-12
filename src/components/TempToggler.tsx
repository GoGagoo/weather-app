import { Slash } from 'lucide-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TODOS_LOCAL_STORAGE_TEMP_UNIT } from '../constants/constants'

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
	border: 1px solid #ffffff56;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: transparent;
		transition: background-color 350ms ease-in-out;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	&:active {
		background-color: #ffffff82;
	}
`

interface StyledProps {
	active: boolean
}

const CelsiusFirstLetter = styled.p<StyledProps>`
	display: flex;
	font-size: 18px;
	font-weight: bold;
	margin-right: 5px;
	color: ${({ active }) => (active ? '#23C5BA' : '#11625c9e')};
`

const FahrenheitFirstLetter = styled.p<StyledProps>`
	display: flex;
	font-size: 18px;
	font-weight: bold;
	margin-left: 5px;
	color: ${({ active }) => (active ? '#23C5BA' : '#23c5ba51')};
`
interface Props {
	onUnitChange: (unit: string) => void
}

export const TempToggler: React.FC<Props> = ({ onUnitChange }) => {
	const [unit, setUnit] = useState<string>('metric')

	useEffect(() => {
		const savedUnit = localStorage.getItem(TODOS_LOCAL_STORAGE_TEMP_UNIT)
		if (savedUnit) {
			setUnit(savedUnit)
		}
	}, [])

	useEffect(() => {
		onUnitChange(unit)
		localStorage.setItem(TODOS_LOCAL_STORAGE_TEMP_UNIT, unit)
	}, [unit, onUnitChange])

	const toggleUnit = () => {
		setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'))
	}

	return (
		<TempTogglerContainer>
			<TempTogglerBtn onClick={toggleUnit}>
				<CelsiusFirstLetter active={unit === 'metric'}>C</CelsiusFirstLetter>
				<Slash size={18} />
				<FahrenheitFirstLetter active={unit === 'imperial'}>
					F
				</FahrenheitFirstLetter>
			</TempTogglerBtn>
		</TempTogglerContainer>
	)
}
