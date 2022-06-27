import {MouseEvent} from 'react'

/**
 * Запретить контекстное меню на продакшене.
 */
export function useDisableContextMenu() {
	return (mouseEvent: MouseEvent) => {
		if (process.env['NODE_ENV'] === 'production') {
			mouseEvent.preventDefault()
		}
	}
}