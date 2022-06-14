import {StartMessage, StartRule} from 'anubis-game-system-2'
import {DataStorageFasade, Entity} from 'anubis-data-storage'
import {IdentificationData} from '../../data/IdentificationData'
import {CircleShapeData, FixtureData, PolygonShapeData, RigidbodyData} from 'anubis-physic-system'
import {Vec2} from 'planck'
import {BallStateData, BallStateType} from '../../data/BallStateData'

const batOffsetY = -15
const width = 11
const height = 0.5
const width2 = 5
const height2 = 0.5

export class BatStartRule extends StartRule {
	protected start({dataStorage}: StartMessage): void {
		new DataStorageFasade(dataStorage).addEntity(
			new Entity(
				new IdentificationData({type: 'Bat'}),
				new RigidbodyData({type: 'kinematic', position: new Vec2(0, batOffsetY), fixedRotation: true}),
				new FixtureData({density: 1, friction: 0}),
				new PolygonShapeData(
					new Vec2(-width / 2, -(height + height2) / 2),
					new Vec2(-width / 2, (height + height2) / 2 - height2),
					new Vec2(-width2 / 2, (height + height2) / 2),
					new Vec2(width2 / 2, (height + height2) / 2),
					new Vec2(width / 2, (height + height2) / 2 - height2),
					new Vec2(width / 2, -(height + height2) / 2),
				)
			),
			new Entity(
				new IdentificationData({type: 'Ball'}),
				new RigidbodyData({type: 'dynamic', position: new Vec2(0, 1 + batOffsetY)}),
				new CircleShapeData(0.7),
				new FixtureData({density: 1, restitution: 1, friction: 0}),
				new BallStateData(BallStateType.Stopped)
			)
		)
	}
}