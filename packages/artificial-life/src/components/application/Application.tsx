import {ISize} from 'base-types'
import {useRef, useState} from 'react'
import useResizeObserver from 'use-resize-observer'
import {useCameraCorrection} from '../../hooks/useCameraCorrection'
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame'
import {useScale} from '../../hooks/useScale'
import {createPlanckWorld, update} from '../../model/createPlanckWorld'
import {PlanckRenderer} from '../renderer/PlanckRenderer'
import {Canvas} from '../svg/Canvas'
import {ApplicationStyle} from './Application.module.scss'

const world = createPlanckWorld()

export function Application() {
	useRequestAnimationFrame((timeInterval) => update(world, timeInterval))

	const ref = useRef<HTMLDivElement>(null)

	const [size, setSize] = useState<ISize>({width: 0, height: 0})
	const {width = 0, height = 0} = size
	useResizeObserver({
		ref,
		onResize: ({width = 0, height = 0}) => {
			setSize({width, height})
		}
	})

	const scale = useScale({width, height}, {width: 70, height: 40})
	const cameraTransform = useCameraCorrection({width, height})

	return (
		<div ref={ref} className={ApplicationStyle}>
			<Canvas>
				<g transform={cameraTransform + `, scale(${scale})`}>
					<PlanckRenderer world={world}/>
				</g>
			</Canvas>
		</div>
	)
}