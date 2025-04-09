import styled from 'styled-components'

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

export { CelsiusFirstLetter, FahrenheitFirstLetter }