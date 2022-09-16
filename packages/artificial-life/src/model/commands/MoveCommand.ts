import {Vec2} from 'planck'
import {createVec2} from '../../functions/createVec2'
import {map} from '../../functions/map'
import {Command} from './Command'

const forceMax = 1000

export class MoveCommand extends Command {
	public execute(): void {
		this.bot.genome.jump()
		const force = map(
			this.bot.genome.readCode(),
			0, this.bot.genome.sequence.maximum,
			0, forceMax
		)

		this.bot.body.setLinearVelocity(new Vec2(0, 0))
		this.bot.body.setAngularVelocity(0)

		this.bot.body.applyForceToCenter(createVec2(this.bot.body.getAngle(), force))
	}
}