import {map} from '../../functions/map'
import {Command} from './Command'

const torqueMaximum = 50

export class RotateCommand extends Command {
	public execute(): void {
		this.bot.genome.jump()
		const torque = map(
			this.bot.genome.readCode(),
			0, this.bot.genome.sequence.maximum,
			-torqueMaximum, torqueMaximum
		)

		this.bot.body.applyTorque(torque)
	}
}