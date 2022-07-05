import {StartRule} from 'anubis-game-system'
import {DataStorageFasade, IDataStorage} from 'anubis-data-storage'
import {BallEntity} from '../../../entities/BallEntity'

/**
 * Внимание, координаты мячика регулируются правилом BallPositionRule.
 */
export class BallStartRule extends StartRule {
	protected start(dataStorage: IDataStorage): void {
		new DataStorageFasade(dataStorage).addEntity(
			new BallEntity
		)
	}
}