import {StartRule} from 'anubis-game-system'
import {DataStorageFasade, IDataStorage} from 'anubis-data-storage'
import {BatCreationMessage} from '../../messages/BatCreationMessage'
import {TrapezoidalBatEntity} from '../../../entities/TrapezoidalBatEntity'

/**
 * @event BatCreationMessage
 */
export class BatStartRule extends StartRule {
	protected start(dataStorage: IDataStorage): void {
		const batEntity = new TrapezoidalBatEntity
		new DataStorageFasade(dataStorage).addEntity(batEntity)
		this.messageEmitter.emit(new BatCreationMessage(batEntity))
	}
}