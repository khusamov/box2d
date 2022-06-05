import {DataAddingMessage, DataFasade, Rule} from "anubis-game-system";
import {ShapeData} from "../data/ShapeData";
import {Shape as PlanckShape} from "planck/dist/planck-with-testbed";
import {ShapeCreationMessage} from "../messages/ShapeCreationMessage";

export class AbstractShapeCreatorRule<S extends ShapeData> extends Rule {
	public constructor(
		private ShapeDataClass: new(...params: any[]) => S,
		private createShape: (shapeData: S) => PlanckShape
	) {
		super()
	}

	public execute(): void {
		this.subscribe.on(DataAddingMessage, ({data}) => {
			if (data instanceof this.ShapeDataClass) {
				const shapeData = data

				if (shapeData.shape) {
					throw new Error('Нельзя добавлять данные с определеным shape')
				}

				const nextShapeData = shapeData.clone()
				nextShapeData.shape = this.createShape(shapeData)
				new DataFasade(shapeData).replace(nextShapeData)

				this.emitter.emit(new ShapeCreationMessage(nextShapeData))
			}
		})
	}
}