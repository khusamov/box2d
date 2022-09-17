import {Fixture} from 'planck'
import {Bot} from './Bot'

export enum SensorActivateType {
	Bot,
	Edge,
	Dead
}

export class Sensor {
	public constructor(
		private readonly onActivate: (type: SensorActivateType) => void
	) {}

	public activate(targetFixture: Fixture) {
		const data = targetFixture.getBody().getUserData()
		if (data instanceof Bot) {
			this.onActivate(
				data.isDead()
					? SensorActivateType.Bot
					: SensorActivateType.Dead
			)
		}
		if (targetFixture.getBody().getUserData() === 'edge') {
			this.onActivate(SensorActivateType.Edge)
		}
	}
}