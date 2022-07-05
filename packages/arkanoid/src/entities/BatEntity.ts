import {Entity, IData} from 'anubis-data-storage'
import {IdentificationData} from '../game/data/IdentificationData'
import {Vec2} from 'planck'
import {FixtureData, IBodyDef, RigidbodyData} from 'anubis-physic-system'

export interface IBatEntityParameters {
	bodyDef?: IBodyDef
	verticalOffset?: number
}

export class BatEntity extends Entity {
	public constructor({bodyDef = {}, verticalOffset = -15}: IBatEntityParameters, ...data: IData[]) {
		super(
			new IdentificationData({type: 'Bat'}),
			new RigidbodyData({type: 'kinematic', position: new Vec2(0, verticalOffset), fixedRotation: true, ...bodyDef}),
			new FixtureData({density: 1, restitution: 0, friction: 0}),
			...data
		)
	}
}