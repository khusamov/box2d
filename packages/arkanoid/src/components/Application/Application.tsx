import {ApplicationStyle} from './Application.module.scss';
import useResizeObserver from 'use-resize-observer';
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame';
import {Canvas} from '../svg/Canvas';
import {PlanckRenderer} from '../renderer/PlanckRenderer';
import {PlanckWorld} from '../../game/data/PlanckWorld';
import {Level1} from '../../game/levels/Level1';
import {Game} from '../../game/base/Game';
import {isData} from '../../game/base/interfaces/IData';
import {MouseEvent} from 'react';
import {Mouse} from '../../game/data/Mouse';
import {Identification} from '../../game/data/Identification';
import {BallState, BallStateType} from '../../game/data/BallState';
import {Rigidbody} from '../../game/data/Rigidbody';
import {Vec2} from 'planck';

const mirrorY = (height: number) => `scale(1, -1), translate(0, -${height})`

const game = new Game(new Level1)
game.init()

export function Application() {
	const {ref, width = 0, height = 0} = useResizeObserver()
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
		const mouse = (
			game.entityList
				.find(entity => entity.find(isData(Mouse)))
				?.find(isData(Mouse))
		)
		if (mouse) {
			mouse.x = (event.clientX - width / 2) / scale
			mouse.y = -(event.clientY - height / 2) / scale
		}
	}

	const onMouseDown = () => {
		// Отдать приказ StartGame.
		const ballEntity = game.entityList.find(entity => {
			const ballStateData = entity.find(isData(BallState))
			const identification = entity.find(isData(Identification))
			return identification && identification.type === 'Ball' && ballStateData && ballStateData.state === BallStateType.Stopped
		})
		if (ballEntity) {
			const ballStateData = ballEntity.find(isData(BallState))
			const ballRigidbodyData = ballEntity.find(isData(Rigidbody))
			if (ballStateData && ballRigidbodyData && ballRigidbodyData.body) {
				ballStateData.state = BallStateType.Moving
				ballRigidbodyData.body.applyForceToCenter(new Vec2(1000, 2500))
			}
		}
	}

	return (
		<div ref={ref} className={ApplicationStyle} onMouseMove={onMouseMove} onMouseDown={onMouseDown}>
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