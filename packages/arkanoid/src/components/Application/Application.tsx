import {ApplicationStyle} from './Application.module.scss';
import useResizeObserver from 'use-resize-observer';
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame';
import {Canvas} from '../svg/Canvas';
import {PlanckRenderer} from '../renderer/PlanckRenderer';
import {PlanckWorld} from '../../game/data/PlanckWorld';
import {Level1} from '../../game/levels/Level1';
import {Game} from '../../game/base/Game';

const mirrorY = (height: number) => `scale(1, -1), translate(0, -${height})`

const game = new Game(new Level1)
game.init()

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
					<line x1={0} y1={100} x2={0} y2={-100} style={{stroke: 'silver'}}/>
					<line x1={100} y1={0} x2={-100} y2={0} style={{stroke: 'silver'}}/>
				</g>
			</Canvas>
		</div>
	)
}