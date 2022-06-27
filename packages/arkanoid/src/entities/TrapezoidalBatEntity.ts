import {Entity} from 'anubis-data-storage'
import {IdentificationData} from '../game/data/IdentificationData'
import {Vec2} from 'planck'
import {FixtureData, RigidbodyData} from 'anubis-physic-system'
import {TrapezoidShapeData} from '../game/data/TrapezoidShapeData'

const batOffsetY = -15

export class TrapezoidalBatEntity extends Entity {


	// TODO Избавиться от наследования от штатного Array!

	public constructor() {
		if (arguments.length === 0) {
			super(
				new IdentificationData({type: 'Bat'}),
				new RigidbodyData({type: 'kinematic', position: new Vec2(0, batOffsetY), fixedRotation: true}),
				new FixtureData({density: 1, friction: 0}),
				new TrapezoidShapeData
			)
		} else {
			super(...arguments)
		}
	}
}