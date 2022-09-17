import {createVec2} from '../../functions/createVec2'
import {Command} from './Command'

/**
 * Атаковать.
 */
export class AttackCommand extends Command {
	public constructor(private readonly attackForce: number = 9000) {
		super()
	}

	public execute(): void {
		const force = this.attackForce

		this.force.push(force)

		this.bot.body.applyForceToCenter(createVec2(this.bot.body.getAngle(), force))
	}
}