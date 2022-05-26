import {IRule} from '../base/interfaces/IRule';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {Rigidbody} from './Rigidbody';
import {PlanckWorld} from './PlanckWorld';
import {Vec2, Box, Shape, Circle} from 'planck';
import {BoxShape} from './shape/BoxShape';
import {CircleShape} from './shape/CircleShape';
import {Data} from '../base/Data';

const isShapeData = (data: Data): data is CircleShape | BoxShape => (
	data instanceof CircleShape
	|| data instanceof BoxShape
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
						&& (entity.hasData(BoxShape) || entity.hasData(CircleShape))
					)
				}
			)

			const planckWorldEntity = entityList.find(entity => entity.hasData(PlanckWorld))
			if (!planckWorldEntity) {
				return
			}


			const planckWorld = planckWorldEntity.getData(PlanckWorld)
			if (!planckWorld.world) {
				return
			}

			for (const rigidbodyEntity of rigidbodyEntityList) {
				const rigidbody = rigidbodyEntity.getData(Rigidbody)
				rigidbody.body = planckWorld.world.createBody({
					type: rigidbody.type,
					position: new Vec2(rigidbody.x, rigidbody.y)
				})

				const shapeData = rigidbodyEntity.data.find(isShapeData)

				if (!shapeData) {
					console.warn('Добавьте к сущности данные CircleShape или BoxShape')
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
					default:
						throw new Error(`Не определен тип формы '${shapeData.constructor.name}'`)
				}


				rigidbody.body.createFixture(shape, shapeData.density)
			}
		}
	}
}