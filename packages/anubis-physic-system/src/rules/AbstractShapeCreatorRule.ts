import {DisposableArray} from 'base-types'
import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system-2'
import {DataAddingMessage, DataStorageFasade} from 'anubis-data-storage'
import {ShapeData} from '../data/ShapeData'
import {Shape as PlanckShape} from 'planck'
import {ShapeCreationMessage} from '../messages/ShapeCreationMessage'

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
		this.messageListenerDisposerArray.push(this.messageEmitter.on(DataAddingMessage, this.onDataAddingMessage.bind(this)))
	}

	private onDataAddingMessage({data}: DataAddingMessage) {
		if (data instanceof this.ShapeDataClass) {
			const shapeData = data

			if (shapeData.shape) {
				throw new Error(`Нельзя добавлять данные ${this.ShapeDataClass.name} с предопределеным shape`)
			}

			this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
				const nextShapeData = shapeData.clone()
				nextShapeData.shape = this.createShape(shapeData)
				new DataStorageFasade(dataStorage).createDataFasade(shapeData).replace(nextShapeData)

				this.messageEmitter.emit(new ShapeCreationMessage(nextShapeData))
			})
		}
	}

	public override dispose() {
		super.dispose()
		this.messageListenerDisposerArray.dispose()
	}
}