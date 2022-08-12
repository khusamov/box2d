import {DataStorageFacade, isData} from 'anubis-data-storage/src'
import {DeletedMarkData} from 'anubis-deletion-system/src'
import {UpdateMessage} from 'anubis-game-system/src'
import {RigidbodyData} from 'anubis-physic-system/src'
import {Rule} from 'anubis-rule-system'
import {Vec2} from 'planck'
import {EntityBoundaryData} from '../data/EntityBoundaryData'
import {byType, IdentificationData} from '../data/IdentificationData'
import {BallPlayOutMessage} from '../messages/BallPlayOutMessage'

/**
 * @event BallPlayOutMessage
 */
export class BallPlayOutRule extends Rule {
	protected execute(): void {
		this.context.messageEmitter.on(UpdateMessage, () => {
			const ballPosition = this.getBallPosition()
			const gameBoardBoundaryData = this.getGameBoardBoundaryData()
			if (ballPosition && gameBoardBoundaryData) {
				if (!gameBoardBoundaryData.hasPointInside(ballPosition)) {
					// Отправляем сообщение о ситуации 'Мяч вне игры'.
					this.context.messageEmitter.emit(new BallPlayOutMessage)
					// Удаляем мяч из игры, чтобы сообщение BallPlayOutMessage не отправлялось бесконечное число раз.
					this.deleteBallEntity()
				}
			}
		})
	}

	private deleteBallEntity() {
		const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
		const ballEntity = this.getBallEntity()
		if (ballEntity) {
			ballEntity.push(new DeletedMarkData)
			dataStorageFacade.createEntityFasade(ballEntity).addData(new DeletedMarkData)
		}
	}

	private getBallEntity() {
		const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
		return dataStorageFacade.createEntityCollection(IdentificationData).find(byType('Ball'))
	}

	private getBallPosition(): Vec2 | void {
		const ballEntity = this.getBallEntity()
		if (ballEntity) {
			const ballBody = ballEntity.find(isData(RigidbodyData))?.body
			if (ballBody) {
				return ballBody.getPosition()
			}
		}
	}

	private getGameBoardBoundaryData(): EntityBoundaryData | void {
		const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
		const gameBoardEntity = dataStorageFacade.createEntityCollection(IdentificationData).find(byType('GameBoard'))
		if (gameBoardEntity) {
			return gameBoardEntity.find(isData(EntityBoundaryData))
		}
	}
}