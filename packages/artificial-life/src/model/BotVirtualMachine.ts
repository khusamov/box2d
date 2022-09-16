import {Bot} from './Bot'
import {CommandProvider} from './commands/CommandProvider'

/**
 * Виртуальная машина ботов.
 * Что она делает?
 * 1) Выполняет команды ботов.
 */
export class BotVirtualMachine {
	public constructor(public readonly commandProvider: CommandProvider) {}

	public update(bot: Bot) {
		const code = bot.genome.readCode()
		const commandInfo = this.commandProvider[code]
		if (commandInfo) {
			commandInfo.command.apply(bot)
		} else {
			// Повторение последней команды, если текущая команда не найдена.
			// for (let offset = 1; offset < bot.genome.sequence.length; offset++) {
			// 	const code = bot.genome.readCode(-offset)
			// 	const CommandClass = codeCommandMap[code]
			// 	if (CommandClass) {
			// 		const command = new CommandClass(bot)
			// 		command.execute()
			// 		break
			// 	}
			// }
		}
		bot.genome.jump()
	}
}