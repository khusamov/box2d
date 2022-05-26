import {ApplicationStyle} from './Application.module.scss';
import useResizeObserver from 'use-resize-observer';
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame';
import {Canvas} from '../svg/Canvas';
import {PlanckRenderer} from '../renderer/PlanckRenderer';
import {Game} from '../../game/base/Game';
import {PlanckWorldRule} from '../../game/rigidbody/PlanckWorldRule';
import {RigidbodyCreatorRule} from '../../game/rigidbody/RigidbodyCreatorRule';
import {Entity} from '../../game/base/Entity';
import {Rigidbody} from '../../game/rigidbody/Rigidbody';
import {BoxShape} from '../../game/rigidbody/shape/BoxShape';
import {PlanckWorld} from '../../game/rigidbody/PlanckWorld';

const mirrorY = (height: number) => `scale(1, -1), translate(0, -${height})`

const game = new Game([
	new PlanckWorldRule,
	new RigidbodyCreatorRule
])

game.init()

game.entityList.push(
	new Entity('DynamicSampleBody', [
		new Rigidbody('dynamic', 0, 0),
		new BoxShape(1, 1, 1)
	])
)

game.entityList.push(
	new Entity('GroundBody', [
		new Rigidbody('static', 0, -10),
		new BoxShape(10, 1, 1)
	])
)

export function Application() {
	const {ref, width = 0, height = 0} = useResizeObserver()
	useRequestAnimationFrame(game.update.bind(game))

	const cameraTransform = [
		mirrorY(height),
		`translate(${width / 2}, ${height / 2}), scale(14)`,
	]

	const planckWorldData = game.entityList.find(entity => entity.hasData(PlanckWorld))?.getData(PlanckWorld)

	return (
		<div ref={ref} className={ApplicationStyle}>
			<Canvas>
				<g transform={cameraTransform.join(', ')}>
					{planckWorldData && planckWorldData.world && <PlanckRenderer world={planckWorldData.world}/>}
				</g>
			</Canvas>
		</div>
	)
}