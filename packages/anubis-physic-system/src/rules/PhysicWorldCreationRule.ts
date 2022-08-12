import {DataStorageFacade, EntityAfterAddingMessage, isData} from 'anubis-data-storage'
import {Rule} from 'anubis-rule-system'
import {IDisposable} from 'base-types'
import {World} from 'planck'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'

/**
 * Правило создания мира физической симуляции Planck.
 *
 * Если добавить сущность с данными PhysicWorldData в хранилище,
 * то будет создан мир физической симуляции.
 *
 * Внимание, сущность с данными PhysicWorldData добавляется правилом
 * PhysicWorldStartRule, поэтому вручную добавлять не требуется.
 *
 * Можно добавить только одну сущность с данными PhysicWorldData.
 * Остальные PhysicWorldData будут игнорироваться.
 *
 * @event PhysicWorldCreationMessage
 */
export class PhysicWorldCreationRule extends Rule {
	protected execute(): void {
		this.context.messageEmitter.on(EntityAfterAddingMessage, this.onEntityAfterAddingMessage.bind(this))
	}

	private onEntityAfterAddingMessage({entity}: EntityAfterAddingMessage, {dispose}: IDisposable) {
		const physicWorldDataOrder = entity.find(isData(PhysicWorldData))
		if (physicWorldDataOrder) {
			if (physicWorldDataOrder.world) {
				throw new Error('Нельзя добавлять данные PhysicWorldData с предопределенным world')
			}

			this.createWorld(physicWorldDataOrder)

			// Остальные сущности с данными PhysicWorldData будут игнорироваться.
			dispose()
		}
	}

	private createWorld(physicWorldDataOrder: PhysicWorldData) {
		const worldDef = physicWorldDataOrder.worldDef
		const physicWorldData = new PhysicWorldData(worldDef, new World(worldDef))
		new DataStorageFacade(this.context.dataStorage).createDataFasade(physicWorldDataOrder).replace(physicWorldData)
		this.context.messageEmitter.emit(new PhysicWorldCreationMessage(physicWorldData))
	}
}