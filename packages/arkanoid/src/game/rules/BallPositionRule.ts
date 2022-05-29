import {IRule} from '../base/interfaces/IRule';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {isData} from '../base/interfaces/IData';
import {Identification} from '../data/Identification';
import {Rigidbody} from '../data/Rigidbody';
import {Vec2} from 'planck';
import {CircleShape} from '../data/CircleShape';
import {BallState, BallStateType} from '../data/BallState';
import {PolygonShape} from '../data/PolygonShape';

export class BallPositionRule implements IRule {
	private game: IGameEnvironment | undefined

	init(game: IGameEnvironment) {
		this.game = game
	}

	update() {
		if (this.game) {
			const {entityList} = this.game

			const batEntity = entityList.find(entity => {
				const identification = entity.find(isData(Identification))
				return identification && identification.type === 'Bat'
			})

			const ballEntity = entityList.find(entity => {
				const identification = entity.find(isData(Identification))
				return identification && identification.type === 'Ball'
			})

			if (batEntity && ballEntity) {
				const ballStateData = ballEntity.find(isData(BallState))
				if (ballStateData && ballStateData.state === BallStateType.Moving) {
					return
				}

				const ballRigidbodyData = ballEntity.find(isData(Rigidbody))
				const ballCircleShapeData = ballEntity.find(isData(CircleShape))
				const batRigidbodyData = batEntity.find(isData(Rigidbody))
				const batPolygonShapeData = batEntity.find(isData(PolygonShape))
				if (ballRigidbodyData && batRigidbodyData && batPolygonShapeData && ballCircleShapeData && batRigidbodyData.body && ballRigidbodyData.body) {
					const batPosition = batRigidbodyData.body.getPosition()

					const height = Math.abs(
						Math.max(...batPolygonShapeData.vertices.map(vertex => vertex.y))
						- Math.min(...batPolygonShapeData.vertices.map(vertex => vertex.y))
					)

					ballRigidbodyData.body.setPosition(
						new Vec2(
							batPosition.x,
							batPosition.y + height / 2 + ballCircleShapeData.radius
						)
					)
				}
			}
		}
	}
}