import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system-2'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'

export class PhysicWorldUpdateRule extends Rule {
	public init(): void {
		this.messageEmitter.once(PhysicWorldCreationMessage, ({world}) => {
			this.messageEmitter.on(UpdateMessage, ({timeInterval}) => {
				world.step(timeInterval)
			})
		})
	}
}