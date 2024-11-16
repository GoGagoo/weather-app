import { Slash } from 'lucide-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TODOS_LOCAL_STORAGE_TEMP_UNIT } from '../constants/constants'
import { Button } from '../uikit'

interface StyledProps {
	$isactive: 'true' | 'false'
}

const CelsiusFirstLetter = styled.p<StyledProps>`
	display: flex;
	font-size: 18px;
	font-weight: bold;
	margin-right: 5px;
	color: ${({ $isactive }) => ($isactive === 'true' ? '#1da49b' : '#808e8c')};
`

const FahrenheitFirstLetter = styled.p<StyledProps>`
	display: flex;
	font-size: 18px;
	font-weight: bold;
	margin-left: 5px;
	color: ${({ $isactive }) => ($isactive === 'true' ? '#23C5BA' : '#808e8c')};
`

interface Props {
	onUnitChange: (unit: string) => void
}

export const TempToggler: React.FC<Props> = ({ onUnitChange }) => {
	const [unit, setUnit] = useState<string>('celsius')

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
		setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'))
	}

	const activeCelsiusUnitProp = unit === 'celsius' ? 'true' : 'false'
	const activeFahrenheitUnitProp = unit === 'fahrenheit' ? 'true' : 'false'

	return (
		<Button onClick={toggleUnit}>
			<CelsiusFirstLetter $isactive={activeCelsiusUnitProp}>
				C
			</CelsiusFirstLetter>
			<Slash size={18} />
			<FahrenheitFirstLetter $isactive={activeFahrenheitUnitProp}>
				F
			</FahrenheitFirstLetter>
		</Button>
	)
}
