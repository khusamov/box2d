import {Entity} from 'anubis-data-storage'
import {IdentificationData} from '../game/data/IdentificationData'
import {BallStateData, BallStateType} from '../game/data/BallStateData'
import {CircleShapeData, FixtureData, RigidbodyData} from 'anubis-physic-system'

export class BallEntity extends Entity {
	public constructor() {
		super(
			new IdentificationData({type: 'Ball'}),
			new RigidbodyData({type: 'dynamic'}),
			new CircleShapeData(0.7),
			new FixtureData({density: 1, restitution: 1, friction: 0}),
			new BallStateData(BallStateType.Stopped)
		)
	}
}