import {ApplicationStyle} from './Application.module.scss';
import {useRef, MouseEvent} from 'react'
import useResizeObserver from 'use-resize-observer';
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame';
import {Canvas} from '../svg/Canvas';
import {PlanckRenderer} from '../renderer/PlanckRenderer';
import {useRequestPointerLock} from '../../hooks/useRequestPointerLock'
import {GameCreator} from 'anubis-game-system-2'
import {PilotLevel} from '../../game/levels/PilotLevel'
import {BatMoveMessage} from '../../game/messages/BatMoveMessage'
import {StartGameMessage} from '../../game/messages/StartGameMessage'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {PhysicWorldData} from 'anubis-physic-system'
import {FloatPanel} from '../panel/FloatPanel'
import {GameScoreData} from '../../game/data/GameScoreData'
import {usePauseGame} from '../../hooks/usePauseGame'
import {useScale} from '../../hooks/useScale'
import {useCameraCorrection} from '../../hooks/useCameraCorrection'
import {DebugCenterLines} from './DebugCenterLines'
import {ScaleAnimatedGroup} from './ScaleAnimatedGroup'

const debug = false

const game = new GameCreator(new PilotLevel).create()
game.init()
game.start()
const dataStorageFasade = new DataStorageFasade(game.dataStorage)

export function Application() {
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

	const world = dataStorageFasade.find(isData(PhysicWorldData))?.world
	const score = dataStorageFasade.find(isData(GameScoreData))?.score || 0

	return (
		<div ref={ref} className={ApplicationStyle} onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
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