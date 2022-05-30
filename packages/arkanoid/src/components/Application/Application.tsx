import {ApplicationStyle} from './Application.module.scss';
import useResizeObserver from 'use-resize-observer';
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame';
import {Canvas} from '../svg/Canvas';
import {PlanckRenderer} from '../renderer/PlanckRenderer';
import {PlanckWorld} from '../../game/data/PlanckWorld';
import {Level1} from '../../game/levels/Level1';
import {Game} from '../../game/base/Game';
import {isData} from '../../game/base/interfaces/IData';
import {useRef} from 'react'
import {Identification} from '../../game/data/Identification';
import {Entity} from '../../game/base/Entity'
import {OrderExecutorRule} from '../../game/rules/OrderExecutorRule'
import {StartGameOrder} from '../../game/orders/StartGameOrder'
import {BatMoveOrder} from '../../game/orders/BatMoveOrder'
import {useRequestPointerLock} from '../../hooks/useRequestPointerLock'

const mirrorY = (height: number) => `scale(1, -1), translate(0, -${height})`

const game = new Game(new Level1, new OrderExecutorRule)
game.entityList.push(new Entity(new Identification({type: 'OrderList'})))
game.init()

export function Application() {
	const ref = useRef<HTMLDivElement>(null)
	const {width = 0, height = 0} = useResizeObserver({ref})
	useRequestAnimationFrame(game.update.bind(game))

	const scale = 14

	const cameraTransform = [
		mirrorY(height),
		`translate(${width / 2}, ${height / 2}), scale(${scale})`,
	]

	const world = (
		game.entityList
			.find(entity => entity.find(isData(PlanckWorld)))
			?.find(isData(PlanckWorld))
			?.world
	)

	const onMouseMove = (event: MouseEvent) => {
		// Отдать приказ BatMoveOrder.
		game.entityList.find(entity => {
			const identification = entity.find(isData(Identification))
			if (identification && identification.type === 'OrderList') {
				entity.push(new BatMoveOrder(event.movementX / scale, event.movementY / scale))
			}
		})
	}

	const onMouseDown = () => {
		// Отдать приказ StartGame.
		game.entityList.find(entity => {
			const identification = entity.find(isData(Identification))
			if (identification && identification.type === 'OrderList') {
				entity.push(new StartGameOrder)
			}
		})
	}

	const [onClick] = useRequestPointerLock({ref, onMouseMove, onMouseDown})

	return (
		<div ref={ref} className={ApplicationStyle} onClick={onClick}>
			<Canvas>
				<g transform={cameraTransform.join(', ')}>
					{world && <PlanckRenderer world={world}/>}
					<line x1={0} y1={100} x2={0} y2={-100} style={{stroke: 'silver'}}/>
					<line x1={100} y1={0} x2={-100} y2={0} style={{stroke: 'silver'}}/>
				</g>
			</Canvas>
		</div>
	)
}