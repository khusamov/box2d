import {ScaleAnimatedGroup} from '../../animate/ScaleAnimatedGroup'
import {PlanckRenderer} from '../../renderer/PlanckRenderer'
import {DebugCenterLines} from '../../debug/DebugCenterLines'
import {Canvas} from '../../svg/Canvas'
import {GameCanvasStyle} from './GameCanvas.module.scss'
import {Game} from 'anubis-game-system'
import {MouseEvent, useRef} from 'react'
import useResizeObserver from 'use-resize-observer'
import {useRequestPointerLock} from '../../../hooks/useRequestPointerLock'
import {useScale} from '../../../hooks/useScale'
import {useCameraCorrection} from '../../../hooks/useCameraCorrection'
import {usePauseGame} from '../../../hooks/usePauseGame'
import {StartGameMessage} from '../../../game/messages/StartGameMessage'
import {BatMoveMessage} from '../../../game/messages/BatMoveMessage'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {PhysicWorldData} from 'anubis-physic-system'

interface IGameCanvasProps {
	game: Game
}

export function GameCanvas({game}: IGameCanvasProps) {
	const ref = useRef<HTMLDivElement>(null)
	const {width = 0, height = 0} = useResizeObserver({ref})
	const [requestLock, cancelLock, locked] = useRequestPointerLock(ref)
	const scale = useScale({width, height}, {width: 70, height: 40})
	const cameraTransform = useCameraCorrection({width, height})
	usePauseGame(game)
	const dataStorageFasade = new DataStorageFasade(game.dataStorage)
	const world = dataStorageFasade.find(isData(PhysicWorldData))?.world

	const onMouseDown = ({button}: MouseEvent) => {
		if (!locked && button === 0) {
			requestLock()
		}
		if (locked) {
			switch (button) {
				case 0:
					game.messageEmitter.emit(new StartGameMessage)
					break
				case 2:
					cancelLock()
					break
			}
		}
	}

	const onMouseMove = ({movementX, movementY}: MouseEvent) => {
		if (locked) {
			game.messageEmitter.emit(
				new BatMoveMessage(
					movementX / scale,
					movementY / scale
				)
			)
		}
	}

	return (
		<div className={GameCanvasStyle} ref={ref} onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
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