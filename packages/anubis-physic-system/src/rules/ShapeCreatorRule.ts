import {Shape} from 'planck'
import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {DataStorageFasade, EntityAfterAddingMessage, isData} from 'anubis-data-storage'
import {ShapeData} from '../data/ShapeData'
import {ShapeCreationMessage} from '../messages/ShapeCreationMessage'

/**
 * Правила создания форм для твердого тела.
 * @event ShapeCreationMessage
 */
export class ShapeCreatorRule<S extends ShapeData> extends Rule {
	public constructor(
		private ShapeDataClass: new(...params: any[]) => S,
		private createShape: (shapeData: S) => Shape
	) {
		super()
	}

	public init(): void {
		this.messageEmitter.on(EntityAfterAddingMessage, this.onEntityAfterAddingMessage.bind(this))
	}

	private onEntityAfterAddingMessage({entity}: EntityAfterAddingMessage) {
		const shapeDataOrderList = entity.flat(Infinity).filter(isData(this.ShapeDataClass))
		for (const shapeDataOrder of shapeDataOrderList) {
			this.createShapeAndEmitMessage(shapeDataOrder)
		}
	}

	private createShapeAndEmitMessage(shapeDataOrder: S) {
		if (shapeDataOrder.shape) {
			throw new Error(`Нельзя добавлять данные ${this.ShapeDataClass.name} с предопределеным shape`)
		}
		this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
			const shapeData = (
				shapeDataOrder.clone(
					this.createShape(shapeDataOrder)
				)
			)
			new DataStorageFasade(dataStorage).createDataFasade(shapeDataOrder).replace(shapeData)
			this.messageEmitter.emit(new ShapeCreationMessage(shapeData))
		})
	}
}