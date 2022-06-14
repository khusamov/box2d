import {RefObject, useEffect} from 'react'

interface IRplProps<T extends HTMLElement> {
	ref: RefObject<T>
	onMouseMove: (event: MouseEvent) => void
	onMouseDown: (event: MouseEvent) => void
}

type TOnClick = () => void
type TIRplResult = [TOnClick]

/**
 * Простая реализация Pointer Lock API для React.js.
 *
 * TODO По идее код ref.current.addEventListener и ref.current.removeEventListener должен быть вынесен за пределы useRequestPointerLock().
 *
 * @link https://developer.mozilla.org/ru/docs/Web/API/Pointer_Lock_API
 * @link https://habr.com/ru/sandbox/106598/
 * @param ref
 * @param onMouseDown
 * @param onMouseMove
 */
export function useRequestPointerLock<T extends HTMLElement>({ref, onMouseDown, onMouseMove}: IRplProps<T>): TIRplResult {
	const onPointerLockChange = () => {
		if (ref.current) {
			if (document.pointerLockElement === ref.current) {
				ref.current.addEventListener('mousemove', onMouseMove)
				ref.current.addEventListener('mousedown', onMouseDown)
			} else {
				ref.current.removeEventListener('mousemove', onMouseMove)
				ref.current.removeEventListener('mousedown', onMouseDown)
			}
		}
	}

	useEffect(() => {
		document.addEventListener('pointerlockchange', onPointerLockChange)
		return () => {
			document.removeEventListener('pointerlockchange', onPointerLockChange)
			document.exitPointerLock()
			if (ref.current) {
				ref.current.removeEventListener('mousemove', onMouseMove)
				ref.current.removeEventListener('mousedown', onMouseDown)
			}
		}
	}, [])

	const onClick = () => {
		if (ref.current) {
			ref.current.requestPointerLock()
		}
	}

	return [onClick]
}