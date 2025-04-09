export const logError = (message: string, error: unknown) => {
	if (error instanceof Error) {
		console.error(`${message}:`, error.message)
	} else {
		console.error(`${message}:`, error)
	}
}
