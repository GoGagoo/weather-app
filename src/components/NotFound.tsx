import { CloudOff } from 'lucide-react'
import styled from 'styled-components'

const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	justify-content: center;
	align-items: center;
	height: 100vh;
	font-size: 18px;
	color: #ffffffa6;
	border-radius: 10px;
	border-style: dotted;
	box-shadow: 0px 7px 20px 5px rgba(0, 0, 0, 0.25);
`

export const NotFound = () => (
	<ErrorWrapper>
		<CloudOff fill='white' strokeWidth={1} size={100} />
		<p>Oops! We couldn't load the weather data.</p>
		<p>Please try again later</p>
	</ErrorWrapper>
)
