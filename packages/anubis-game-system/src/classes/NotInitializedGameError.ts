export class NotInitializedGameError extends Error {
	public constructor() {
		console.warn('Игра не инициализирована.')
		console.warn('Возможно забыли вызвать game.init(). Воспользуйтесь классом GameCreator.')
		console.warn('Или был вызван преждевременно game.dispose().')
		super('Игра не инициализирована')
	}
}