import {Command} from './Command'

export class ReturnCommand extends Command {
	protected execute(): void {
		this.bot.genome.return()
	}
}