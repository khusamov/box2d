import {DataStorageFacade} from 'anubis-data-storage'
import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {isData} from 'anubis-data-storage'
import {byType, IdentificationData} from '../data/IdentificationData'
import {BallStateData, BallStateType} from '../data/BallStateData'
import {CircleShapeData, PolygonShapeData, RigidbodyData} from 'anubis-physic-system'
import {Vec2} from 'planck'

/**
 * Если мяч не движется (состояние равно BallStateType.Stopped), то он должен
 * двигаться вместе с битой.
 */
export class BallPositionRule extends Rule {
	protected execute(): void {
		this.context.messageEmitter.on(UpdateMessage, ({}) => {
			const entityCollection = new DataStorageFacade(this.context.dataStorage).createEntityCollection(IdentificationData)
			const batEntity = entityCollection.find(byType('Bat'))
			const ballEntity = entityCollection.find(byType('Ball'))

			if (batEntity && ballEntity) {
				const ballIsStopped = ballEntity.find(isData(BallStateData))?.state === BallStateType.Stopped

				if (ballIsStopped) {
					const ballRigidbodyData = ballEntity.find(isData(RigidbodyData))
					const ballCircleShapeData = ballEntity.find(isData(CircleShapeData))
					const batRigidbodyData = batEntity.find(isData(RigidbodyData))
					const batPolygonShapeData = batEntity.find(isData(PolygonShapeData))

					const batBody = batRigidbodyData?.body
					const ballBody = ballRigidbodyData?.body

					if (
						batPolygonShapeData
						&& ballCircleShapeData
						&& batBody
						&& ballBody
					) {
						const batPosition = batBody.getPosition()

						const height = Math.abs(
							Math.max(...batPolygonShapeData.vertices.map(vertex => vertex.y))
							- Math.min(...batPolygonShapeData.vertices.map(vertex => vertex.y))
						)

						ballBody.setPosition(
							new Vec2(
								batPosition.x,
								batPosition.y + height / 2 + ballCircleShapeData.radius
							)
						)
					}
				}
			}
		})
	}
}