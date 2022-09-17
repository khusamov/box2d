import {Bot} from '../Bot'
import {EnergyConsumption} from './EnergyConsumption'

export type TCommandConstructor = {
	new(): Command
}

export abstract class Command {
	private _bot: Bot | undefined
	public force: EnergyConsumption = new EnergyConsumption

	protected get bot(): Bot {
		if (!this._bot) {
			throw new Error('Не задан бот')
		}
		return this._bot
	}

	protected abstract execute(): void

	/**
	 * Выполнить команду в отношении определенного бота.
	 * @param {Bot} bot
	 * @returns {number} Возвращает силу, которая была затрачена во время выполнения команды.
	 */
	public apply(bot: Bot): number {
		this._bot = bot
		this.execute()
		this._bot = undefined
		const force = this.force.value
		this.force.clear()
		return force
	}
}