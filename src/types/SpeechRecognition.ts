export interface SpeechRecognitionEvent extends Event {
	results: {
		[key: number]: {
			[key: number]: {
				transcript: string
				confidence: number
			}
		}
	}
}

export interface SpeechRecognitionErrorEvent extends Event {
	error: string
}

declare global {
	interface Window {
		SpeechRecognition: SpeechRecognition
		webkitSpeechRecognition: SpeechRecognition
	}
}

export type UseSpeechRecognitionReturn = {
	isListening: boolean
	error: string | null
	startListening: () => void
	stopListening: () => void
}

export interface SpeechRecognition extends EventTarget {
	new (): SpeechRecognition
	lang: string
	interimResults: boolean
	maxAlternatives: number
	continuous: boolean
	start: () => void
	stop: () => void
	abort: () => void
	onresult: (event: SpeechRecognitionEvent) => void
	onerror: (event: SpeechRecognitionErrorEvent) => void
	onend: () => void
}