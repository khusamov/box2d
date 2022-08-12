import {DataStorageFacade, EntityAfterAddingMessage, isData} from 'anubis-data-storage'
import {Rule} from 'anubis-rule-system'
import {Shape} from 'planck'
import {ShapeData} from '../data/shape/ShapeData'
import {ShapeCreationMessage} from '../messages/ShapeCreationMessage'

/**
 * Правила создания форм для твердого тела.
 * @event ShapeCreationMessage
 */
export class ShapeCreationRule<S extends ShapeData> extends Rule {
	public constructor(
		private ShapeDataClass: new(...params: any[]) => S,
		private createShape: (shapeData: S) => Shape
	) {
		super()
	}

	protected execute(): void {
		this.context.messageEmitter.on(EntityAfterAddingMessage, this.onEntityAfterAddingMessage.bind(this))
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
		const shapeData = (
			shapeDataOrder.clone(
				this.createShape(shapeDataOrder)
			)
		)
		new DataStorageFacade(this.context.dataStorage).createDataFasade(shapeDataOrder).replace(shapeData)
		this.context.messageEmitter.emit(new ShapeCreationMessage(shapeData))
	}
}