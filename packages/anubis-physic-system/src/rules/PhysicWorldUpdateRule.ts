import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'

/**
 * После создания мира физический симуляции запускается постоянный процесс его обновления.
 * Для обновления требуется извне игры отправлять сообщение UpdateMessage из игрового цикла.
 */
export class PhysicWorldUpdateRule extends Rule {
	public init(): void {
		this.messageEmitter.once(PhysicWorldCreationMessage, ({world}) => {
			this.messageEmitter.on(UpdateMessage, ({timeInterval}) => {
				world.step(timeInterval)
			})
		})
	}
}