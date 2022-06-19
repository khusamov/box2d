import {StartRule} from 'anubis-game-system-2'
import {DataStorageFasade, Entity, IDataStorage} from 'anubis-data-storage'
import {IdentificationData} from '../../data/IdentificationData'
import {FixtureData, PolygonShapeData, RigidbodyData} from 'anubis-physic-system'
import {Vec2} from 'planck'
import {BatCreationMessage} from '../../messages/BatCreationMessage'

const batOffsetY = -15

const width = 11
const height = 0.5
const width2 = 5
const height2 = 0.5

/**
 * @event BatCreationMessage
 */
export class BatStartRule extends StartRule {
	protected start(dataStorage: IDataStorage): void {
		const batEntity = new Entity(
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
		new DataStorageFasade(dataStorage).addEntity(batEntity)
		this.messageEmitter.emit(new BatCreationMessage(batEntity))
	}
}