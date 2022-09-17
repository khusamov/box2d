import {Bot} from './Bot'
import {CommandProvider} from './commands/CommandProvider'

interface IBotVirtualMachineParameters {
	/**
	 * Конвертация силы (Ньютон) в единицы энергии.
	 * Значение от 0 до 1.
	 */
	forceToEnergyRate?: number

	/**
	 * Частота выполнения команд бота.
	 * Число операций в секунду.
	 */
	frequency?: number
}

/**
 * Виртуальная машина ботов.
 */
export class BotVirtualMachine {
	private botPauseTime = 0
	private readonly frequency: number
	private readonly forceToEnergyRate: number

	public constructor(
		public readonly commandProvider: CommandProvider,
		{forceToEnergyRate = .01, frequency = 5}: IBotVirtualMachineParameters = {}
	) {
		this.forceToEnergyRate = forceToEnergyRate
		this.frequency = frequency
	}

	public update(timeInterval: number, bots: Bot[]) {
		this.botPauseTime += timeInterval
		if (this.botPauseTime > 1 / this.frequency) {
			this.botPauseTime = 0
			for (const bot of bots) {
				this.updateBot(bot)
			}
		}
	}

	private updateBot(bot: Bot) {
		if (!bot.isDead()) {
			const code = bot.genome.readCode()
			const commandInfo = this.commandProvider[code]
			if (commandInfo) {
				const force = commandInfo.command.apply(bot)
				bot.energy.decrease(force * this.forceToEnergyRate)
			}
			bot.genome.jump()
		}
	}
}