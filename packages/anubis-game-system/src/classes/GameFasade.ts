import {IGame} from '../interfaces/IGame'

export enum GameState {
	Executed,
	Paused
}

export class GameFasade {
	public constructor(private game: IGame) {}

	public start() {
		this.game.context[messageEmissionSymbol].enable()
	}

	public stop() {
		this.game.context[messageEmissionSymbol].disable()
	}

	public pause() {}
	public toggle() {}
	public update() {}

	private get messageEmission() {
		return this.game.context[messageEmissionSymbol]
	}

	public get state(): GameState {
		return (
			this.messageEmission.isActive
				? GameState.Executed
				: GameState.Paused
		)
	}
}