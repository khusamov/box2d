import {Entity} from 'anubis-data-storage'
import {IdentificationData} from '../game/data/IdentificationData'
import {Vec2} from 'planck'
import {FixtureData, PolygonShapeData, RigidbodyData} from 'anubis-physic-system'

const batOffsetY = -15

const width = 11
const height = 0.5
const width2 = 5
const height2 = 0.5

export class TrapezoidalBatEntity extends Entity {
	public constructor() {
		super(
			new IdentificationData({type: 'Bat'}),
			new RigidbodyData({type: 'kinematic', position: new Vec2(0, batOffsetY), fixedRotation: true}),
			new FixtureData({density: 1, friction: 0}),
			new PolygonShapeData(
				undefined,
				new Vec2(-width / 2, -(height + height2) / 2),
				new Vec2(-width / 2, (height + height2) / 2 - height2),
				new Vec2(-width2 / 2, (height + height2) / 2),
				new Vec2(width2 / 2, (height + height2) / 2),
				new Vec2(width / 2, (height + height2) / 2 - height2),
				new Vec2(width / 2, -(height + height2) / 2),
			)
		)
	}
}