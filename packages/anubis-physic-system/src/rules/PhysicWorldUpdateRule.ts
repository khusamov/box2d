import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {World} from 'planck'
import {PhysicWorldRuleHelper} from '../classes/PhysicWorldRuleHelper'

/**
 * После создания мира физический симуляции запускается постоянный процесс его обновления.
 * Для обновления требуется извне игры отправлять сообщение UpdateMessage из игрового цикла.
 */
export class PhysicWorldUpdateRule extends Rule {
	protected async execute(): Promise<void> {
		const world = await new PhysicWorldRuleHelper(this.context).getWorld()
		this.createPhysicWorldUpdater(world)
	}

	private createPhysicWorldUpdater(world: World) {
		this.context.messageEmitter.on(UpdateMessage, ({timeInterval}) => {
			world.step(timeInterval)
		})
	}
}