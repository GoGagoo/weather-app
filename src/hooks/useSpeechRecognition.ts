import { useCallback, useState } from 'react'
import {
	SpeechRecognitionErrorEvent,
	SpeechRecognitionEvent,
	UseSpeechRecognitionReturn,
} from '../types/SpeechRecognition'

export const useSpeechRecognition = (
	onResult: (transcript: string) => void,
	languages: string[] = ['en-US', 'ru']
): UseSpeechRecognitionReturn => {
	const [isListening, setIsListening] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleResult = useCallback(
		(event: SpeechRecognitionEvent) => {
			const transcript = event.results[0][0].transcript
			onResult(transcript)
			setIsListening(false)
		},
		[onResult]
	)

	const handleError = useCallback((event: SpeechRecognitionErrorEvent) => {
		setError(`Speech recognition error: ${event.error}`)
		setIsListening(false)
	}, [])

	const startListening = useCallback(() => {
		setError(null)
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition

		if (!SpeechRecognition) {
			setError('Speech Recognition is not supported in this browser.')
			return
		}

		const recognition = new SpeechRecognition()
		recognition.lang = languages.join(',')
		recognition.interimResults = false
		recognition.maxAlternatives = 1

		recognition.onresult = handleResult as (event: Event) => void
		recognition.onerror = handleError as (event: Event) => void
		recognition.onend = () => setIsListening(false)

		try {
			recognition.start()
			setIsListening(true)
		} catch (err) {
			setError('Failed to start speech recognition.')
		}

		return () => {
			recognition.stop()
		}
	}, [handleResult, handleError, languages])

	const stopListening = useCallback(() => {
		setIsListening(false)
	}, [])

	return {
		isListening,
		error,
		startListening,
		stopListening,
	}
}
