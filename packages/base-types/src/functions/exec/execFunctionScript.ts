import {syntaxErrorHandler} from './syntaxErrorHandler';

/**
 * Выполнить скрипт из текста, который возвращает значение типа T.
 * @param source
 */
export function execFunctionScript<T>(source: string): T {
	if (!source.trim()) {
		throw new Error('Не задано тело функции')
	}

	try {
		const code = new Function('', `return (${source})`)
		return code()
	} catch (error) {
		if (error instanceof SyntaxError) {
			syntaxErrorHandler(error, source)
		}
		throw error
	}
}