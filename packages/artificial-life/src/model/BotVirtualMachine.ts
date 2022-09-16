import {Bot} from './Bot'
import {Command} from './commands/Command'
import {LookCommand} from './commands/LookCommand'
import {MoveCommand} from './commands/MoveCommand'
import {RotateCommand} from './commands/RotateCommand'
import {StopCommand} from './commands/StopCommand'

/**
 * Карта соответствия кода генома и команды.
 */
export const codeCommandMap: Record<number, {new(bot: Bot): Command}> = {
	0: MoveCommand,
	1: LookCommand,
	2: RotateCommand,
	3: StopCommand
}

/**
 * Виртуальная машина ботов.
 * Что она делает?
 * 1) Выполняет команды ботов.
 */
export class BotVirtualMachine {
	public update(bot: Bot) {
		const code = bot.genome.readCode()
		const CommandClass = codeCommandMap[code]
		if (CommandClass) {
			const command = new CommandClass(bot)
			command.execute()
		} else {
			// Повторение последней команды, если текущая команда не найдена.
			for (let offset = 1; offset < bot.genome.sequence.length; offset++) {
				const code = bot.genome.readCode(-offset)
				const CommandClass = codeCommandMap[code]
				if (CommandClass) {
					const command = new CommandClass(bot)
					command.execute()
					break
				}
			}
		}
		bot.genome.jump()
	}
}