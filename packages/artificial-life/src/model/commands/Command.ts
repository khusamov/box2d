import {Bot} from '../Bot'

const dummyBot = new Bot

export type TCommandConstructor = {
	new(): Command
}

export abstract class Command {
	private _bot: Bot = dummyBot

	protected get bot(): Bot {
		if (this._bot === dummyBot) {
			throw new Error('Не задан бот')
		}
		return this._bot
	}

	protected abstract execute(): void

	public apply(bot: Bot) {
		this._bot = bot
		this.execute()
	}
}