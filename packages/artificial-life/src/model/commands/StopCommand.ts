import {Vec2} from 'planck'
import {Command} from './Command'

export class StopCommand extends Command {
	public execute(): void {
		this.bot.body.setLinearVelocity(new Vec2(0, 0))
		this.bot.body.setAngularVelocity(0)
	}
}