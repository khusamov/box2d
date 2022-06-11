import {Vec2, World} from 'planck'
import {DataAddingMessage, DataStorageFasade} from 'anubis-data-storage'
import {Rule} from 'anubis-rule-system'
import {IWorldDef} from '../interfaces/IWorldDef'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'
import {DisposableArray, IDisposable} from 'base-types'
import {UpdateMessage} from 'anubis-game-system-2'

const defaultWorldDef: Readonly<IWorldDef> = {
	gravity: Vec2(0, 0),
	blockSolve: true
}

/**
 * Если добавить данные PhysicWorldData в хранилище, то будет создан мир физической симуляции.
 * Остальные PhysicWorldData будут игнорироваться.
 * @event PhysicWorldCreationMessage
 */
export class PhysicWorldCreatorRule extends Rule {
	private messageListenerDisposerArray: DisposableArray = new DisposableArray

	public init(): void {
		this.messageListenerDisposerArray.push(this.messageBroker.on(DataAddingMessage, this.onDataAddingMessage.bind(this)))
	}

	private onDataAddingMessage({data}: DataAddingMessage, {dispose}: IDisposable) {
		if (data instanceof PhysicWorldData) {
			const physicWorldDataOrder = data

			if (physicWorldDataOrder.world) {
				throw new Error('Нельзя добавлять данные PhysicWorldData с предопределенным world')
			}

			this.messageBroker.once(UpdateMessage, ({dataStorage}) => {
				const worldDef = Object.assign({}, defaultWorldDef, physicWorldDataOrder.worldDef)
				const physicWorldData = new PhysicWorldData(worldDef, new World(worldDef))

				new DataStorageFasade(dataStorage).createDataFasade(physicWorldDataOrder).replace(physicWorldData)
				this.messageBroker.emit(new PhysicWorldCreationMessage(physicWorldData))
			})

			dispose()
		}
	}

	public override dispose() {
		super.dispose()
		this.messageListenerDisposerArray.dispose()
	}
}