import {RefObject, useEffect, useState} from 'react'

type TIRplResult = [
	/**
	 * Вход в режим захвата курсора мышки.
	 */
	() => void,
	/**
	 * Программный выход из режима захвата курсора мышки.
	 */
	() => void,
	/**
	 * Состояние захвата курсора мышки.
	 */
	boolean
]

/**
 * Простая реализация Pointer Lock API для React.js.
 *
 * Usage:
 * const [requestLock, cancelLock, locked] = useRequestPointerLock(ref)
 *
 * @link https://developer.mozilla.org/ru/docs/Web/API/Pointer_Lock_API
 * @link https://habr.com/ru/sandbox/106598/
 * @param ref
 */
export function useRequestPointerLock<T extends HTMLElement>(ref: RefObject<T>): TIRplResult {
	const [isPointerLock, setIsPointerLock] = useState(false)

	const requestPointerLock = () => {
		if (ref.current) {
			ref.current.requestPointerLock()
		}
	}

	const cancelPointerLock = () => {
		document.exitPointerLock()
	}

	useEffect(() => {
		const onPointerLockChange = () => setIsPointerLock(document.pointerLockElement === ref.current)
		document.addEventListener('pointerlockchange', onPointerLockChange)
		return () => {
			document.removeEventListener('pointerlockchange', onPointerLockChange)
			cancelPointerLock()
		}
	}, [])

	return [requestPointerLock, cancelPointerLock, isPointerLock]
}