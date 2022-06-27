import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {byType, IdentificationData} from '../data/IdentificationData'
import {BallStateData, BallStateType} from '../data/BallStateData'
import {CircleShapeData, PolygonShapeData, RigidbodyData} from 'anubis-physic-system'
import {Vec2} from 'planck'

/**
 * Если мяч не движется (состояние равно BallStateType.Stopped), то он должен
 * двигаться вместе с битой.
 */
export class BallPositionRule extends Rule {
	public init(): void {
		this.messageEmitter.on(UpdateMessage, ({dataStorage}) => {
			const entityCollection = new DataStorageFasade(dataStorage).createEntityCollection(IdentificationData)
			const batEntity = entityCollection.find(byType('Bat'))
			const ballEntity = entityCollection.find(byType('Ball'))

			if (batEntity && ballEntity) {
				if (ballEntity.find(isData(BallStateData))?.state === BallStateType.Moving) {
					return
				}

				const ballRigidbodyData = ballEntity.find(isData(RigidbodyData))
				const ballCircleShapeData = ballEntity.find(isData(CircleShapeData))
				const batRigidbodyData = batEntity.find(isData(RigidbodyData))
				const batPolygonShapeData = batEntity.find(isData(PolygonShapeData))

				if (
					ballRigidbodyData
					&& batRigidbodyData
					&& batPolygonShapeData
					&& ballCircleShapeData
					&& batRigidbodyData.body
					&& ballRigidbodyData.body
				) {
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
		})
	}
}