import {ScaleAnimatedGroup} from '../../animate/ScaleAnimatedGroup'
import {DebugCenterLines} from '../../debug/DebugCenterLines'
import {Canvas} from '../../svg/Canvas'
import {GameCanvasStyle} from './GameCanvas.module.scss'
import {Game} from 'anubis-game-system'
import {useRef, useState} from 'react'
import useResizeObserver from 'use-resize-observer'
import {useRequestPointerLock} from '../../../hooks/useRequestPointerLock'
import {useScale} from '../../../hooks/useScale'
import {useCameraCorrection} from '../../../hooks/useCameraCorrection'
import {usePauseGame} from '../../../hooks/usePauseGame'
import {StartGameMessage} from '../../../game/messages/StartGameMessage'
import {BatMoveMessage} from '../../../game/messages/BatMoveMessage'
import {useEventListener} from '../../../hooks/useEventListener'
import {GameRenderer} from './GameRenderer'

const MAIN_BUTTON = 0
const RIGHT_BUTTON = 2

interface IGameCanvasProps {
	game: Game
}

export function GameCanvas({game}: IGameCanvasProps) {
	usePauseGame(game)
	const ref = useRef<HTMLDivElement>(null)
	const {width = 0, height = 0} = useResizeObserver({ref})
	const {requestPointerLock, cancelPointerLock, isPointerLock} = useRequestPointerLock(ref)
	const scale = useScale({width, height}, {width: 70, height: 40})
	const cameraTransform = useCameraCorrection({width, height})

	const [isIntroAnimateEnd, setIsIntroAnimateEnd] = useState(false)
	const onAnimationEnd = () => setIsIntroAnimateEnd(true)

	useEventListener(ref, 'pointerdown', {passive: false}, event => {
		const {pointerType, button} = event
		switch (pointerType) {
			case 'touch':
				event.preventDefault()
				break
			case 'mouse':
				if (!isPointerLock && button === MAIN_BUTTON) {
					requestPointerLock()
					game.start()
				}
				if (isPointerLock) {
					switch (button) {
						case MAIN_BUTTON:
							game.messageEmitter.emit(new StartGameMessage)
							break
						case RIGHT_BUTTON:
							cancelPointerLock()
							game.stop()
							break
					}
				}
				break
		}
	})

	useEventListener(ref, 'pointermove', {passive: false}, event => {
		const {pointerType, movementX, movementY} = event
		switch (pointerType) {
			case 'touch':
				event.preventDefault()
				game.messageEmitter.emit(
					new BatMoveMessage(
						movementX / scale,
						movementY / -scale
					)
				)
				break
			case 'mouse':
				if (isPointerLock) {
					game.messageEmitter.emit(
						new BatMoveMessage(
							movementX / scale,
							movementY / -scale
						)
					)
				}
				break
		}
	})

	useEventListener(ref, 'touchmove', {passive: false}, event => {
		event.preventDefault()
	})

	useEventListener(ref, 'pointerenter', {passive: false}, event => {
		const {isPrimary, pointerType} = event
		switch (pointerType) {
			case 'touch':
				event.preventDefault()
				if (isPrimary) {
					game.start()
				}
				if (!isPrimary) {
					game.messageEmitter.emit(new StartGameMessage)
				}
				break
		}
	})

	useEventListener(ref, 'pointerleave', {passive: false}, event => {
		const {isPrimary, pointerType} = event
		switch (pointerType) {
			case 'touch':
				event.preventDefault()
				if (isPrimary) {
					if (isIntroAnimateEnd) {
						game.pause()
					}
				}
				break
		}
	})

	return (
		<div ref={ref} className={GameCanvasStyle}>
			<Canvas>
				<g transform={cameraTransform}>
					<ScaleAnimatedGroup scale={scale} onAnimationEnd={onAnimationEnd}>
						<GameRenderer game={game}/>
						{process.env['DEBUG'] === 'true' && <DebugCenterLines/>}
					</ScaleAnimatedGroup>
				</g>
			</Canvas>
		</div>
	)
}