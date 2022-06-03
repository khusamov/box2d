const SPACE = ' '
const EOL = '\n'
const trim = (message: string): string => message.trim()

/**
 * Собрать мультистроковый текст в одну строку без лишних
 * пробельных символов (переносы, табы и т.п.).
 * @param message
 */
export function toOneLine(message: string) {
	return message.trim().split(EOL).map(trim).join(SPACE)
}