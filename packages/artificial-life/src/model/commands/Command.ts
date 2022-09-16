import {Bot} from '../Bot'

export abstract class Command {
	public constructor(protected readonly bot: Bot) {}
	public abstract execute(): void
}