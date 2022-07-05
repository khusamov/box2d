import {World} from 'planck'
import {IDisposable} from 'base-types'
import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {DataStorageFasade, EntityAfterAddingMessage, isData} from 'anubis-data-storage'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'
import {PhysicWorldData} from '../data/PhysicWorldData'

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
	public init(): void {
		this.messageEmitter.on(EntityAfterAddingMessage, this.onEntityAfterAddingMessage.bind(this))
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
		this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
			const worldDef = physicWorldDataOrder.worldDef
			const physicWorldData = new PhysicWorldData(worldDef, new World(worldDef))
			new DataStorageFasade(dataStorage).createDataFasade(physicWorldDataOrder).replace(physicWorldData)
			this.messageEmitter.emit(new PhysicWorldCreationMessage(physicWorldData))
		})
	}
}