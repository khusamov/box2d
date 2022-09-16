import {Fixture, Vec2} from 'planck'
import {createVec2} from '../../functions/createVec2'
import {map} from '../../functions/map'
import {Bot} from '../Bot'
import {Command} from './Command'

const lookRangeMaximum = 5

export class LookCommand extends Command {
	public execute(): void {
		this.bot.genome.jump()
		const lookRange = map(
			this.bot.genome.readCode(),
			0, this.bot.genome.sequence.maximum,
			0, lookRangeMaximum
		)

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
			const distance = Vec2.distance(this.bot.body.getPosition(), closest.point)
			switch (target) {
				case 'bot':
					if (distance < lookRangeMaximum / 2) {
						this.bot.body.applyForceToCenter(
							createVec2(
								this.bot.body.getAngle(),
								3000
							)
						)
					}
					break
				case 'edge':
					if (distance < lookRangeMaximum) {
						this.bot.body.applyForceToCenter(
							createVec2(
								this.bot.body.getAngle(),
								-800
							)
						)
					}
					break
			}
		}
	}
}