import {IRule} from '../base/interfaces/IRule';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {Rigidbody} from '../data/Rigidbody';
import {PlanckWorld} from '../data/PlanckWorld';
import {Vec2, Box, Shape, Circle} from 'planck';
import {BoxShape} from '../data/BoxShape';
import {CircleShape} from '../data/CircleShape';
import {Data} from '../base/Data';
import {EdgeShape} from '../data/EdgeShape';
import {Edge} from 'planck/dist/planck';

const isShapeData = (data: Data): data is CircleShape | BoxShape | EdgeShape => (
	data instanceof CircleShape
	|| data instanceof BoxShape
	|| data instanceof EdgeShape
)

/**
 * Для новых сущностей без твердых тел требуется их создать.
 */
export class RigidbodyCreatorRule implements IRule {
	private game: IGameEnvironment | undefined

	init(game: IGameEnvironment) {
		this.game = game
	}

	update(_timeInterval: number) {
		if (this.game) {
			const {entityList} = this.game

			const rigidbodyEntityList = entityList.filter(
				// Выбираем сущности, для которых не созданы твердые тела.
				entity => {
					if (!entity.hasData(Rigidbody)) {
						return false
					}
					return (
						!entity.getData(Rigidbody).body
						&& (entity.hasData(BoxShape) || entity.hasData(CircleShape) || entity.hasData(EdgeShape))
					)
				}
			)

			const planckWorldData = entityList.find(entity => entity.hasData(PlanckWorld))?.getData(PlanckWorld)
			if (!planckWorldData || !planckWorldData.world) {
				return
			}

			for (const rigidbodyEntity of rigidbodyEntityList) {
				const rigidbody = rigidbodyEntity.getData(Rigidbody)
				rigidbody.body = planckWorldData.world.createBody({
					type: rigidbody.type,
					position: new Vec2(rigidbody.x, rigidbody.y)
				})

				const shapeData = rigidbodyEntity.data.find(isShapeData)

				if (!shapeData) {
					console.warn('Добавьте к сущности данные CircleShape или BoxShape или EdgeShape')
					throw new Error(`Не определена форма твердого тела сущности '${rigidbodyEntity.name}'`)
				}

				let shape: Shape;
				switch (shapeData.constructor.name) {
					case CircleShape.name:
						shape = new Circle((shapeData as CircleShape).radius)
						break
					case BoxShape.name:
						shape = new Box((shapeData as BoxShape).width, (shapeData as BoxShape).height)
						break
					case EdgeShape.name:
						shape = new Edge(
							new Vec2((shapeData as EdgeShape).x1, (shapeData as EdgeShape).y1),
							new Vec2((shapeData as EdgeShape).x2, (shapeData as EdgeShape).y2)
						)
						break
					default:
						throw new Error(`Не определен тип формы '${shapeData.constructor.name}'`)
				}

				rigidbody.body.createFixture(shape, {
					density: shapeData.density,
					restitution: 1
				})
			}
		}
	}
}