import {ISize} from 'base-types'
import {useRef, useState} from 'react'
import useResizeObserver from 'use-resize-observer'
import {useCameraCorrection} from '../../hooks/useCameraCorrection'
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame'
import {useScale} from '../../hooks/useScale'
import {BotVirtualMachine} from '../../model/BotVirtualMachine'
import {AttackCommand} from '../../model/commands/AttackCommand'
import {CommandProvider} from '../../model/commands/CommandProvider'
import {FleeCommand} from '../../model/commands/FleeCommand'
import {LookCommand} from '../../model/commands/LookCommand'
import {MoveCommand} from '../../model/commands/MoveCommand'
import {ReturnCommand} from '../../model/commands/ReturnCommand'
import {RotateCommand} from '../../model/commands/RotateCommand'
import {StopCommand} from '../../model/commands/StopCommand'
import {LifeModel} from '../../model/LifeModel'
import {PlanckRenderer} from '../renderer/PlanckRenderer'
import {Canvas} from '../svg/Canvas'
import {ApplicationStyle} from './Application.module.scss'

const life = new LifeModel(
	new BotVirtualMachine(
		new CommandProvider(
			// {command: new MoveCommand, frequency: 100},
			// {command: new AttackCommand, frequency: 20},
			// {command: new RotateCommand, frequency: 50},
			// {command: new FleeCommand, frequency: 30},
			// {command: new LookCommand, frequency: 20},
			// {command: new StopCommand, frequency: 10},
			// {command: new ReturnCommand, frequency: 10},
			{command: new MoveCommand, frequency: 100},
			{command: new AttackCommand, frequency: 100},
			{command: new RotateCommand, frequency: 100},
			{command: new FleeCommand, frequency: 100},
			{command: new LookCommand, frequency: 100},
			{command: new StopCommand, frequency: 100},
			{command: new ReturnCommand, frequency: 50},
		)
	)
)

export function Application() {
	useRequestAnimationFrame((timeInterval) => life.update(timeInterval))

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
					<PlanckRenderer world={life.world}/>
				</g>
			</Canvas>
		</div>
	)
}