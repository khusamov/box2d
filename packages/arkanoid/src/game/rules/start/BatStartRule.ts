import {Entity} from 'anubis-data-storage'
import {DataStorageFacade} from 'anubis-data-storage'
import {Rule} from 'anubis-rule-system'
import {BatCreationMessage} from '../../messages/BatCreationMessage'

/**
 * @event BatCreationMessage
 */
export class BatStartRule extends Rule {
	public constructor(private batEntity: Entity) {
		super()
	}

	protected execute(): void {
		new DataStorageFacade(this.context.dataStorage).addEntity(this.batEntity)
		this.context.messageEmitter.emit(new BatCreationMessage(this.batEntity))
	}
}