import {DataStorageFacade, isData} from 'anubis-data-storage'
import {RuleHelper} from 'anubis-rule-system'
import {World} from 'planck'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'

/**
 * Помощник правила игры для получения ссылки на объект мира физической симуляции.
 */
export class PhysicWorldRuleHelper extends RuleHelper {
	public async getWorld(): Promise<World> {
		let world = new DataStorageFacade(this.context.dataStorage).find(isData(PhysicWorldData))?.world
		if (!world) {
			world = (await this.getPhysicWorldCreationMessage()).world
		}
		return world
	}

	private async getPhysicWorldCreationMessage(): Promise<PhysicWorldCreationMessage> {
		return new Promise(resolve => {
			this.context.messageEmitter.once(PhysicWorldCreationMessage, resolve)
		})
	}
}