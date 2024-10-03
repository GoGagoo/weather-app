import { Slash } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { setUnit } from '../../store/weatherSlice'
import { Button } from '../../uikit'
import { CelsiusFirstLetter, FahrenheitFirstLetter } from './TempToggler.styled'

export const TempToggler = () => {
	const dispatch = useDispatch()
	const unit = useTypedSelector((state) => state.weather.unit)

	const toggleUnit = () => {
		const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius'
		dispatch(setUnit(newUnit))
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
