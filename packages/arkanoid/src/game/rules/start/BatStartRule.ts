import {StartRule} from 'anubis-game-system'
import {DataStorageFasade, Entity, IDataStorage} from 'anubis-data-storage'
import {BatCreationMessage} from '../../messages/BatCreationMessage'

/**
 * @event BatCreationMessage
 */
export class BatStartRule extends StartRule {
	public constructor(private batEntity: Entity) {
		super()
	}

	protected start(dataStorage: IDataStorage): void {
		new DataStorageFasade(dataStorage).addEntity(this.batEntity)
		this.messageEmitter.emit(new BatCreationMessage(this.batEntity))
	}
}