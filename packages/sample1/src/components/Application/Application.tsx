import {ApplicationStyle} from './Application.module.scss';
import useResizeObserver from 'use-resize-observer';
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame';
// import {Box2dRenderer} from '../renderer/Box2dRenderer';
// import {createBox2dWorld, update} from '../../model/createBox2dWorld';
import {createPlanckWorld, update} from '../../model/createPlanckWorld';
import {Canvas} from '../svg/Canvas';
import {PlanckRenderer} from '../renderer/PlanckRenderer';

const mirrorY = (height: number) => `scale(1, -1), translate(0, -${height})`

// const world = createBox2dWorld()
const world = createPlanckWorld()

export function Application() {
	const {ref, width = 0, height = 0} = useResizeObserver()
	useRequestAnimationFrame(step => update(world, step))

	const cameraTransform = [
		mirrorY(height),
		`translate(${width / 2}, ${height / 2}), scale(14)`,
	]

	return (
		<div ref={ref} className={ApplicationStyle}>
			<Canvas>
				<g transform={cameraTransform.join(', ')}>
					<PlanckRenderer world={world}/>
				</g>
			</Canvas>
		</div>
	)
}