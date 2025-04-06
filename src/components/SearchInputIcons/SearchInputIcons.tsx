import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import {
	Barrier,
	IconsContainer,
	StyledMic,
	StyledMicOff,
	StyledSearch,
} from './SearchInputIcons.styled'

interface Props {
	size?: number
	color: string
	hasCharacters?: boolean
	error?: boolean
	onVoiceInput: (query: string) => void
}

export const SearchInputIcons: React.FC<Props> = ({
	hasCharacters,
	error,
	onVoiceInput,
}) => {
	const { isListening, startListening, stopListening } =
		useSpeechRecognition(onVoiceInput)

	const handleMicClick = () => {
		if (isListening) {
			stopListening()
		} else {
			startListening()
		}
	}

	return (
		<IconsContainer>
			{isListening ? (
				<StyledMicOff size={20} onClick={handleMicClick} />
			) : (
				<StyledMic size={20} onClick={handleMicClick} />
			)}
			<Barrier />
			<StyledSearch size={20} $hasError={hasCharacters || error} />
		</IconsContainer>
	)
}
