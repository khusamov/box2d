import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {byType, IdentificationData} from '../data/IdentificationData'
import {DataStorageFasade, EntityAfterAddingMessage, IEntity, isData} from 'anubis-data-storage'
import {MouseJointData, RigidbodyData} from 'anubis-physic-system'
import {Vec2} from 'planck'
import {BatMoveMessage} from '../messages/BatMoveMessage'

/**
 *  Правило движения биты: следование биты за курсором мышки при помощи MouseJoint как на жесткой пружинке.
 *  Позволяет задать скорость движения биты и использовать трение между ней и мячиком.
 *
 *  Внимание, правило автоматически добавляет в сущность типа Bat данные MouseJointData.
 */
export class BatMouseJointMovingRule extends Rule {
	public init(): void {
		this.addMouseJointIntoBat()
		this.messageEmitter.on(BatMoveMessage, this.onBatMoveMessage.bind(this))
	}

	private onBatMoveMessage({movementX}: BatMoveMessage) {
		this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
			const batEntity = (
				new DataStorageFasade(dataStorage)
					.createEntityCollection(IdentificationData)
					.find(byType('Bat'))
			)
			if (batEntity) {
				const body = batEntity.find(isData(RigidbodyData))?.body
				const mouseJoint = batEntity.find(isData(MouseJointData))?.mouseJoint
				if (body && mouseJoint) {
					mouseJoint.setTarget(
						new Vec2(
							mouseJoint.getTarget().x + movementX,
							mouseJoint.getTarget().y
						)
					)
				}
			}
		})
	}

	private addMouseJointIntoBat() {
		this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
			const dataStorageFasade = new DataStorageFasade(dataStorage)
			const addMouseJointInto = (
				(batEntity: IEntity) => (
					dataStorageFasade
						.createEntityFasade(batEntity)
						.addData(this.createMouseJointData())
				)
			)
			const batEntity = (
				dataStorageFasade
					.createEntityCollection(IdentificationData)
					.find(byType('Bat'))
			)
			if (batEntity) {
				addMouseJointInto(batEntity)
			} else {
				this.messageEmitter.on(EntityAfterAddingMessage, ({entity}, {dispose}) => {
					if (entity.find(isData(IdentificationData))?.type === 'Bat') {
						addMouseJointInto(entity)
						dispose()
					}
				})
			}
		})
	}

	private createMouseJointData() {
		return (
			new MouseJointData({
				maxForce: Number.MAX_SAFE_INTEGER,
				dampingRatio: 1,
				//frequencyHz: 100,
				target: new Vec2(0, -15), // TODO Сюда подставлять начальные координаты биты.
				findBodyB: dataStorage => (
					new DataStorageFasade(dataStorage)
						.createEntityCollection(IdentificationData)
						.find(byType('Bat'))
						?.find(isData(RigidbodyData))
						?.body
				)
			})
		)
	}
}