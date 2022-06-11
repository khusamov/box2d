import {Rule} from 'anubis-rule-system'
import {DataAddingMessage, DataStorageFasade} from 'anubis-data-storage'
import {ShapeData} from '../data/ShapeData';
import {Shape as PlanckShape} from 'planck';
import {ShapeCreationMessage} from '../messages/ShapeCreationMessage';
import {UpdateMessage} from 'anubis-game-system-2'
import {DisposableArray} from 'base-types'

/**
 * @event ShapeCreationMessage
 */
export class AbstractShapeCreatorRule<S extends ShapeData> extends Rule {
	private messageListenerDisposerArray: DisposableArray = new DisposableArray

	public constructor(
		private ShapeDataClass: new(...params: any[]) => S,
		private createShape: (shapeData: S) => PlanckShape
	) {
		super()
	}

	public init(): void {
		this.messageListenerDisposerArray.push(this.messageBroker.on(DataAddingMessage, this.onDataAddingMessage.bind(this)))
	}

	private onDataAddingMessage({data}: DataAddingMessage) {
		if (data instanceof this.ShapeDataClass) {
			const shapeData = data

			if (shapeData.shape) {
				throw new Error(`Нельзя добавлять данные ${this.ShapeDataClass.name} с предопределеным shape`)
			}

			this.messageBroker.once(UpdateMessage, ({dataStorage}) => {
				const nextShapeData = shapeData.clone()
				nextShapeData.shape = this.createShape(shapeData)
				new DataStorageFasade(dataStorage).createDataFasade(shapeData).replace(nextShapeData)

				this.messageBroker.emit(new ShapeCreationMessage(nextShapeData))
			})
		}
	}

	public override dispose() {
		super.dispose()
		this.messageListenerDisposerArray.dispose()
	}
}