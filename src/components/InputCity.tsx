import { Sparkles, Tornado } from 'lucide-react'
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

export const InputCity = () => (
	<ErrorWrapper>
		<Sparkles size={100} fill="gold" strokeWidth={0.5} />
		<p>Enter the name of the city to see the forecast.</p>
	</ErrorWrapper>
)
