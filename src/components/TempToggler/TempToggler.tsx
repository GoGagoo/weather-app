import { Slash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TODOS_LOCAL_STORAGE_TEMP_UNIT } from '../../constants/constants'
import { Button } from '../../uikit'
import { CelsiusFirstLetter, FahrenheitFirstLetter } from './TempToggler.styled'

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
