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
 * @link https://developer.mozilla.org/ru/docs/Web/API/Pointer_Lock_API
 * @link https://habr.com/ru/sandbox/106598/
 * @param ref
 */
export function useRequestPointerLock<T extends HTMLElement>(ref: RefObject<T>): TIRplResult {
	const [isLock, setIsLock] = useState(false)
	const onPointerLockChange = () => {
		if (ref.current) {
			if (document.pointerLockElement === ref.current) {
				setIsLock(true)
			} else {
				setIsLock(false)
			}
		}
	}

	useEffect(() => {
		document.addEventListener('pointerlockchange', onPointerLockChange)
		return () => {
			document.removeEventListener('pointerlockchange', onPointerLockChange)
			document.exitPointerLock()
		}
	}, [])

	const requestPointerLock = () => {
		if (ref.current) {
			ref.current.requestPointerLock()
		}
	}

	return [requestPointerLock, () => document.exitPointerLock(), isLock]
}