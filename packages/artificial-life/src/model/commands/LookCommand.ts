import {Fixture, Vec2} from 'planck'
import {createVec2} from '../../functions/createVec2'
import {Bot} from '../Bot'
import {Command} from './Command'

type TSign = 1 | -1

export class LookCommand extends Command {
	public constructor(private readonly lookRangeMaximum: number = 10) {
		super()
	}

	public execute(): void {
		const lookRange = this.bot.genome.readCode(1, [0, this.lookRangeMaximum])
		const signOffset: TSign = [1, -1][this.bot.genome.readCode(2) & 1] as TSign

		const direction = createVec2(this.bot.body.getAngle(), lookRange)

		const world = this.bot.body.getWorld()
		let closest: { fixture: Fixture, point: Vec2, normal: Vec2 } | undefined
		world.rayCast(
			this.bot.body.getPosition(),
			Vec2.add(this.bot.body.getPosition(), direction),
			(fixture, point, normal, fraction) => {
				// https://github.com/shakiba/planck.js/wiki/World#ray-casts
				closest = {fixture, point, normal}
				return fraction
			}
		)
		if (closest) {
			const data = closest.fixture.getBody().getUserData()
			let target: 'bot' | 'edge' | undefined
			if (data instanceof Bot) target = 'bot'
			if (data === 'edge') target = 'edge'
			switch (target) {
				default:
					// TODO Возможно стоит количество шагов перехода сделать параметром.
					this.bot.genome.jump(10 * signOffset)
					break
				case 'bot':
				case 'edge':
					this.bot.genome.jump(5 * signOffset)
					break
			}
		}

		this.force.push(lookRange * 10)
	}
}