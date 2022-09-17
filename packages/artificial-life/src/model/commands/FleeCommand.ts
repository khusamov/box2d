import {createVec2} from '../../functions/createVec2'
import {getRandomInt} from '../../functions/getRandomInt'
import {Command} from './Command'

/**
 * Сбежать.
 */
export class FleeCommand extends Command {
	public constructor(
		private readonly fleeForceMaximum: number = 1000,
		private readonly fleeTorqueMaximum: number = 90
	) {
		super()
	}

	public execute(): void {
		// Отскочить.
		const fleeForce = this.fleeForceMaximum
		this.bot.body.applyForceToCenter(
			createVec2(
				this.bot.body.getAngle(),
				-fleeForce
			)
		)
		this.force.push(fleeForce)

		// Повернуться.
		const torque = (
			getRandomInt(
				-this.fleeTorqueMaximum,
				+this.fleeTorqueMaximum
			)
		)
		this.bot.body.applyTorque(torque)
		this.force.push(torque / this.bot.shape.getRadius())
	}
}