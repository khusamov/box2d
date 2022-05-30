import {IData} from '../base/interfaces/IData'
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment'

/**
 * Способ ввода информации в игровой мир.
 * Создается сущность и в нее добавляются данные с приказами.
 * Специальное правило OrderExecutorRule на каждый кадр выполняет все приказы.
 */
export class Order implements IData {
	public execute(_game: IGameEnvironment): void {}

	public clone(): Order {
		return new Order
	}
}