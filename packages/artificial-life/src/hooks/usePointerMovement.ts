import {RefObject, useState} from 'react'
import {useEventListener} from './useEventListener'

type TMovement = Pick<PointerEvent, 'movementX' | 'movementY'>

interface IPointerMovementResult {
	/**
	 * На iOS для события pointermove не реализованы поля movementX и movementY. И поэтому приходится их эмулировать.
	 * @param event
	 */
	getMovement(event: PointerEvent): TMovement
}

/**
 * На iOS для события pointermove не реализованы поля movementX и movementY. И поэтому приходится их эмулировать.
 * @param ref
 */
export function usePointerMovement(ref: RefObject<HTMLElement>): IPointerMovementResult {
	const [previousPosition, setPreviousPosition] = useState<{previousX: number, previousY: number}>({previousX: 0, previousY: 0})

	useEventListener(ref, 'pointerenter', {passive: false}, () => {
		setPreviousPosition({
			previousX: 0,
			previousY: 0
		})
	})

	return {
		getMovement: (
			(event: PointerEvent) => {
				const {screenX, screenY} = event
				let {movementX, movementY} = event
				if (movementX === undefined || movementY === undefined) {
					if (previousPosition.previousX === 0 && previousPosition.previousY === 0) {
						movementX = 0
						movementY = 0
					} else {
						movementX = screenX - previousPosition.previousX
						movementY = screenY - previousPosition.previousY
					}
					setPreviousPosition({previousX: screenX, previousY: screenY})
				}
				return {movementX, movementY}
			}
		)
	}
}