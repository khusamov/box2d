import {Game} from 'anubis-game-system'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {usePauseGame} from '../../../hooks/usePauseGame'
import {useRequestAnimationFrame} from '../../../hooks/useRequestAnimationFrame'
import {MouseEvent, useRef} from 'react'
import useResizeObserver from 'use-resize-observer'
import {useRequestPointerLock} from '../../../hooks/useRequestPointerLock'
import {useScale} from '../../../hooks/useScale'
import {useCameraCorrection} from '../../../hooks/useCameraCorrection'
import {StartGameMessage} from '../../../game/messages/StartGameMessage'
import {BatMoveMessage} from '../../../game/messages/BatMoveMessage'
import {PhysicWorldData} from 'anubis-physic-system'
import {GameScoreData} from '../../../game/data/GameScoreData'
import {ApplicationStyle} from '../../application/Application.module.scss'
import {Canvas} from '../../svg/Canvas'
import {ScaleAnimatedGroup} from '../../animate/ScaleAnimatedGroup'
import {PlanckRenderer} from '../../renderer/PlanckRenderer'
import {DebugCenterLines} from '../../debug/DebugCenterLines'
import {FloatPanel} from '../../panel/FloatPanel'

const debug = false

interface IGameSceneProps {
	game: Game
}

export function GameScene({game}: IGameSceneProps) {
	const dataStorageFasade = new DataStorageFasade(game.dataStorage)
	usePauseGame(game)
	useRequestAnimationFrame(game.update.bind(game))
	const ref = useRef<HTMLDivElement>(null)
	const {width = 0, height = 0} = useResizeObserver({ref})
	const [requestLock, cancelLock, locked] = useRequestPointerLock(ref)
	const scale = useScale({width, height}, {width: 70, height: 40})
	const cameraTransform = useCameraCorrection({width, height})

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

	const onContextMenu = (mouseEvent: MouseEvent) => {
		if (process.env['NODE_ENV'] === 'production') {
			mouseEvent.preventDefault()
		}
	}

	const world = dataStorageFasade.find(isData(PhysicWorldData))?.world
	const score = dataStorageFasade.find(isData(GameScoreData))?.score || 0

	return (
		<div ref={ref} className={ApplicationStyle} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onContextMenu={onContextMenu}>
			<Canvas>
				<g transform={cameraTransform}>
					<ScaleAnimatedGroup scale={scale}>
						{world && <PlanckRenderer world={world}/>}
						{debug && <DebugCenterLines/>}
					</ScaleAnimatedGroup>
				</g>
			</Canvas>
			<FloatPanel>
				Счет: {score}
			</FloatPanel>
		</div>
	)
}