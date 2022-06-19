import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from '../messages/UpdateMessage'
import {IDataStorage} from 'anubis-data-storage'

/**
 * Правило, которое срабатывает один раз в начале игры.
 * Предназначено для создания сущностей перед игрой.
 */
export abstract class StartRule extends Rule {
	public override init() {
		this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
			this.start(dataStorage)
		})
	}

	/**
	 * Вызывается один раз в начале игры.
	 * @param dataStorage
	 * @protected
	 */
	protected abstract start(dataStorage: IDataStorage): void
}