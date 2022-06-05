export const splitDate = (date: Date = new Date()) => {
	return date.toISOString().split('T')[0]
}