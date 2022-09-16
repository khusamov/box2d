import {createVec2} from '../../functions/createVec2'
import {Command} from './Command'

const attackForceMaximum = 5000

/**
 * Атаковать.
 */
export class AttackCommand extends Command {
	public execute(): void {
		this.bot.body.applyForceToCenter(
			createVec2(
				this.bot.body.getAngle(),
				attackForceMaximum
			)
		)
	}
}