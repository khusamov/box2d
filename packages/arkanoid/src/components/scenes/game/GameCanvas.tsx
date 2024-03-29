import {Game} from 'anubis-game-system'
import {ISize} from 'base-types'
import {useRef, useState} from 'react'
import useBooleanState from 'use-boolean-state'
import useResizeObserver from 'use-resize-observer'
import {BatMoveMessage} from '../../../game/messages/BatMoveMessage'
import {ResizeMessage} from '../../../game/messages/ResizeMessage'
import {StartGameMessage} from '../../../game/messages/StartGameMessage'
import {useCameraCorrection} from '../../../hooks/useCameraCorrection'
import {useEventListener} from '../../../hooks/useEventListener'
import {usePauseGame} from '../../../hooks/usePauseGame'
import {usePointerMovement} from '../../../hooks/usePointerMovement'
import {useRequestPointerLock} from '../../../hooks/useRequestPointerLock'
import {useScale} from '../../../hooks/useScale'
import {ScaleAnimatedGroup} from '../../animate/ScaleAnimatedGroup'
import {DebugCenterLines} from '../../debug/DebugCenterLines'
import {Canvas} from '../../svg/Canvas'
import {GameCanvasStyle} from './GameCanvas.module.scss'
import {GameRenderer} from './GameRenderer'

const MAIN_BUTTON = 0
const RIGHT_BUTTON = 2

interface IGameCanvasProps {
	game: Game
}

export function GameCanvas({game}: IGameCanvasProps) {
	usePauseGame(game)
	const ref = useRef<HTMLDivElement>(null)
	const {getMovement} = usePointerMovement(ref)

	const [isContextMenuBlockedOnce, setContextMenuBlockedOnce, cancelContextMenuBlockedOnce] = useBooleanState(false)

	const [size, setSize] = useState<ISize>({width: 0, height: 0})
	const {width = 0, height = 0} = size
	useResizeObserver({
		ref,
		onResize: ({width = 0, height = 0}) => {
			setSize({width, height})
			game.context.messageEmitter.emit(new ResizeMessage({width, height}))
			// TODO После отправки ResizeMessage должно сгенерироваться сообщение с новыми размерами игрового мира.
			//  Это нужно для пересчета scale.
		}
	})

	const {requestPointerLock, cancelPointerLock, isPointerLock} = useRequestPointerLock(ref)
	const scale = useScale({width, height}, {width: 70, height: 40})
	const cameraTransform = useCameraCorrection({width, height})

	const [isIntroEnd, setIntroEnd] = useBooleanState(false)
	const onAnimationEnd = () => setIntroEnd()

	const emitStartGameMessage = () => game.context.messageEmitter.emit(new StartGameMessage)
	const emitBatMoveMessage = (movementX: number, movementY: number) => {
		game.context.messageEmitter.emit(
			new BatMoveMessage(
				movementX / scale,
				movementY / -scale
			)
		)
	}

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
							emitStartGameMessage()
							break
						case RIGHT_BUTTON:
							setContextMenuBlockedOnce()
							cancelPointerLock()
							game.stop()
							break
					}
				}
				break
		}
	})

	useEventListener(ref, 'pointermove', {passive: false}, event => {
		const {pointerType} = event
		const {movementX, movementY} = getMovement(event)
		switch (pointerType) {
			case 'touch':
				event.preventDefault()
				emitBatMoveMessage(movementX, movementY)
				break
			case 'mouse':
				if (isPointerLock) {
					emitBatMoveMessage(movementX, movementY)
				}
				break
		}
	})

	useEventListener(ref, 'touchmove', {passive: false}, event => {
		event.preventDefault()
	})

	useEventListener(ref, 'contextmenu', {passive: false}, event => {
		if (isContextMenuBlockedOnce) {
			cancelContextMenuBlockedOnce()
			event.preventDefault()
		}
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
					emitStartGameMessage()
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
					if (isIntroEnd) {
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