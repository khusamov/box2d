import {Vec2} from 'planck'
import {createVec2} from '../../functions/createVec2'
import {Command} from './Command'

export class MoveCommand extends Command {
	public constructor(private readonly moveForceMax: number = 3000) {
		super()
	}

	public execute(): void {
		const force = this.bot.genome.readCode(1, [0, this.moveForceMax])

		this.force.push(force)

		this.bot.body.setLinearVelocity(new Vec2(0, 0))
		this.bot.body.setAngularVelocity(0)

		this.bot.body.applyForceToCenter(createVec2(this.bot.body.getAngle(), force))
	}
}