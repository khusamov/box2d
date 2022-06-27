import {StartRule} from 'anubis-game-system'
import {DataStorageFasade, Entity, IDataStorage} from 'anubis-data-storage'
import {CircleShapeData, FixtureData, RigidbodyData} from 'anubis-physic-system'
import {IdentificationData} from '../../data/IdentificationData'
import {BallStateData, BallStateType} from '../../data/BallStateData'

/**
 * Внимание, координаты мячика регулируются правилом BallPositionRule.
 */
export class BallStartRule extends StartRule {
	protected start(dataStorage: IDataStorage): void {
		new DataStorageFasade(dataStorage).addEntity(
			new Entity(
				new IdentificationData({type: 'Ball'}),
				new RigidbodyData({type: 'dynamic'}),
				new CircleShapeData(0.7),
				new FixtureData({density: 1, restitution: 1, friction: 0}),
				new BallStateData(BallStateType.Stopped)
			)
		)
	}
}