import {IRule} from '../base/interfaces/IRule';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {isData} from '../base/interfaces/IData';
import {Shape as PlanckShape} from 'planck';
import {Shape} from '../data/Shape';

export class AbstractShapeCreatorRule<S extends Shape> implements IRule {
	private game: IGameEnvironment | undefined

	constructor(
		private ShapeClass: new(...params: any[]) => S,
		private createShape: (shapeData: S) => PlanckShape
	) {}

	init(game: IGameEnvironment) {
		this.game = game
	}

	update(_timeInterval: number) {
		if (this.game) {
			const {entityList} = this.game

			const shapeUndefinedEntityList = entityList.filter(entity => {
				const shapeData = entity.find(isData(this.ShapeClass))
				return shapeData && shapeData.shape === undefined
			})

			for (const entity of shapeUndefinedEntityList) {
				const shapeData = entity.find(isData(this.ShapeClass))
				if (shapeData) {
					const shapeDataClone = shapeData.clone()
					shapeDataClone.shape = this.createShape(shapeData)
					entity.splice(entity.indexOf(shapeData), 1, shapeDataClone)
				}
			}
		}
	}
}