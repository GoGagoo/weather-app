export function getDayOfWeek(date: Date = new Date()) {
	const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
	const dayOfMonth = date.getDate()
	const month = date.toLocaleString('en-US', { month: 'short' })

	return `${dayOfWeek}, ${dayOfMonth} ${month}`
}
