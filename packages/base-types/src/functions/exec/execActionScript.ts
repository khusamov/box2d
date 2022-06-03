import {syntaxErrorHandler} from './syntaxErrorHandler';

/**
 * Выполнить скрипт из текста, который ничего не возвращает.
 * @param source
 */
export function execActionScript(source: string | undefined) {
	if (source) {
		try {
			const code = new Function('', source)
			code()
		} catch (error) {
			if (error instanceof SyntaxError) {
				syntaxErrorHandler(error, source)
			}
			throw error
		}
	}
}