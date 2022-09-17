import {Command} from './Command'

export class RotateCommand extends Command {
	public constructor(private readonly rotateTorqueMaximum: number = 50) {
		super()
	}

	public execute(): void {
		const torque = this.bot.genome.readCode(1, [-this.rotateTorqueMaximum, this.rotateTorqueMaximum])

		this.force.push(torque / this.bot.shape.getRadius())

		this.bot.body.applyTorque(torque)
	}
}