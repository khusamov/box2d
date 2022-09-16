import {RefObject, useEffect, useRef} from 'react'

/**
 * Специальный хук для добавления событий на элементы.
 * Позволяет создавать обработчики со ссылками на меняющиеся данные.
 * @param ref
 * @param type
 * @param options
 * @param sourceListener
 */
export function useEventListener<K extends keyof HTMLElementEventMap>(
	ref: RefObject<HTMLElement>, // TODO Заменить на type Ref<T> = RefCallback<T> | RefObject<T> | null.
	type: K,
	options: boolean | AddEventListenerOptions,
	sourceListener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
) {
	const sourceListenerRef = useRef(sourceListener)
	sourceListenerRef.current = sourceListener

	useEffect(() => {
		const listener = (
			function(this: HTMLElement, event: HTMLElementEventMap[K]) {
				return sourceListenerRef.current.call(this, event)
			}
		)

		if (ref.current) {
			ref.current.addEventListener(type, listener, options)
		}
		return () => {
			if (ref.current) {
				ref.current.removeEventListener(type, listener)
			}
		}
	}, [])
}


