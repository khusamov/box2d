import {Entity, IData} from 'anubis-data-storage'
import {IdentificationData} from '../game/data/IdentificationData'
import {Vec2} from 'planck'
import {FixtureData, RigidbodyData} from 'anubis-physic-system'

const batOffsetY = -15

export class BatEntity extends Entity {
	public constructor(...data: IData[]) {
		super(
			new IdentificationData({type: 'Bat'}),
			new RigidbodyData({type: 'kinematic', position: new Vec2(0, batOffsetY), fixedRotation: true}),
			new FixtureData({density: 1, friction: 0}),
			...data
		)
	}
}