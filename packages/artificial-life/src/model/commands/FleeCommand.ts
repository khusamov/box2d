import {createVec2} from '../../functions/createVec2'
import {getRandomInt} from '../../functions/getRandomInt'
import {Command} from './Command'

const fleeTorqueMaximum = 90
const fleeForceMaximum = 1000

/**
 * Сбежать.
 */
export class FleeCommand extends Command {
	public execute(): void {
		// Отскочить.
		this.bot.body.applyForceToCenter(
			createVec2(
				this.bot.body.getAngle(),
				-fleeForceMaximum
			)
		)
		// Повернуться.
		this.bot.body.applyTorque(
			getRandomInt(
				-fleeTorqueMaximum,
				+fleeTorqueMaximum
			)
		)
		// Бежать.
		this.bot.body.applyForceToCenter(
			createVec2(
				this.bot.body.getAngle(),
				fleeForceMaximum * 2
			)
		)
	}
}