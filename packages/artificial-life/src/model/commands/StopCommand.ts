import {Vec2} from 'planck'
import {map} from '../../functions/map'
import {Command} from './Command'

export class StopCommand extends Command {
	public execute(): void {
		this.bot.genome.jump()
		const isLinearVelocityStop: boolean = map(
			this.bot.genome.readCode(),
			0, this.bot.genome.sequence.maximum,
			0, 1
		) === 1

		if (isLinearVelocityStop) this.bot.body.setLinearVelocity(new Vec2(0, 0))
		this.bot.body.setAngularVelocity(0)
	}
}