import {ScaleAnimatedGroup} from '../../animate/ScaleAnimatedGroup'
import {PlanckRenderer} from '../../renderer/PlanckRenderer'
import {DebugCenterLines} from '../../debug/DebugCenterLines'
import {Canvas} from '../../svg/Canvas'
import {GameCanvasStyle} from './GameCanvas.module.scss'
import {Game} from 'anubis-game-system'
import {useRef} from 'react'
import useResizeObserver from 'use-resize-observer'
import {useRequestPointerLock} from '../../../hooks/useRequestPointerLock'
import {useScale} from '../../../hooks/useScale'
import {useCameraCorrection} from '../../../hooks/useCameraCorrection'
import {usePauseGame} from '../../../hooks/usePauseGame'
import {StartGameMessage} from '../../../game/messages/StartGameMessage'
import {BatMoveMessage} from '../../../game/messages/BatMoveMessage'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {PhysicWorldData} from 'anubis-physic-system'
import {useEventListener} from '../../../hooks/useEventListener'

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
	const dataStorageFasade = new DataStorageFasade(game.dataStorage)
	const world = dataStorageFasade.find(isData(PhysicWorldData))?.world

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
		if (isPrimary) {
			game.start()
		}
		if (!isPrimary) {
			game.messageEmitter.emit(new StartGameMessage)
		}
		if (pointerType === 'touch') {
			event.preventDefault()
		}
	})

	useEventListener(ref, 'pointerleave', {passive: false}, event => {
		const {isPrimary, pointerType} = event
		if (isPrimary) {
			game.pause()
		}
		if (pointerType === 'touch') {
			event.preventDefault()
		}
	})

	return (
		<div ref={ref} className={GameCanvasStyle}>
			<Canvas>
				<g transform={cameraTransform}>
					<ScaleAnimatedGroup scale={scale}>
						{world && <PlanckRenderer world={world}/>}
						{process.env['DEBUG'] === 'true' && <DebugCenterLines/>}
					</ScaleAnimatedGroup>
				</g>
			</Canvas>
		</div>
	)
}