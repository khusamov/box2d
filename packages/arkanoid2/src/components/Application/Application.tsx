import {ApplicationStyle} from './Application.module.scss';
import {useRef, MouseEvent} from 'react'
import useResizeObserver from 'use-resize-observer';
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame';
import {Canvas} from '../svg/Canvas';
import {PlanckRenderer} from '../renderer/PlanckRenderer';
import {useRequestPointerLock} from '../../hooks/useRequestPointerLock'
import {GameCreator} from 'anubis-game-system-2'
import {Level1} from '../../game/levels/Level1/Level1'
import {BatMoveMessage} from '../../game/messages/BatMoveMessage'
import {StartGameMessage} from '../../game/messages/StartGameMessage'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {PhysicWorldData} from 'anubis-physic-system'
import {FloatPanel} from '../panel/FloatPanel'
import {GameScoreData} from '../../game/data/GameScoreData'
import {usePauseGame} from '../../hooks/usePauseGame'

const scale = 14
const mirrorY = (height: number) => `scale(1, -1), translate(0, -${height})`

const game = new GameCreator(new Level1).create()
game.init()
game.start()

export function Application() {
	usePauseGame(game)
	const ref = useRef<HTMLDivElement>(null)
	const [requestLock, cancelLock, locked] = useRequestPointerLock(ref)
	const {width = 0, height = 0} = useResizeObserver({ref})
	useRequestAnimationFrame(game.update.bind(game))

	const cameraTransform = [
		mirrorY(height),
		`translate(${width / 2}, ${height / 2}), scale(${scale})`,
	]

	const world = new DataStorageFasade(game.dataStorage).find(isData(PhysicWorldData))?.world


	const onClick = () => {
		requestLock()
	}

	const onMouseMove = (event: MouseEvent) => {
		if (locked) {
			game.messageEmitter.emit(
				new BatMoveMessage(
					event.movementX / scale,
					event.movementY / scale
				)
			)
		}
	}

	const onMouseDown = (event: MouseEvent) => {
		if (locked) {
			switch (event.button) {
				case 0:
					game.messageEmitter.emit(new StartGameMessage)
					break
				case 2:
					cancelLock()
					break
			}
		}
	}

	const score = new DataStorageFasade(game.dataStorage).find(isData(GameScoreData))?.score || 0


	return (
		<div ref={ref} className={ApplicationStyle} onClick={onClick} onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
			<Canvas>
				<g transform={cameraTransform.join(', ')}>
					{world && <PlanckRenderer world={world}/>}
					<line x1={0} y1={100} x2={0} y2={-100} style={{stroke: '#9df5ff'}}/>
					<line x1={100} y1={0} x2={-100} y2={0} style={{stroke: '#9df5ff'}}/>
				</g>
			</Canvas>
			<FloatPanel>
				Счет: {score}
			</FloatPanel>
		</div>
	)
}