import { CloudOff } from 'lucide-react'
import { ErrorWrapper } from './NotFound.styled'

export const NotFound = () => (
	<ErrorWrapper>
		<CloudOff fill='white' strokeWidth={1} size={100} />
		<p>Oops! We couldn't load the weather data.</p>
		<p>Please try again later</p>
	</ErrorWrapper>
)
