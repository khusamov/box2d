import {Sequence} from './Sequence'

/**
 * Геном это закольцованная последовательность элементов.
 * В качестве элемента пока выступает число.
 */
export abstract class Genome {
	/**
	 * Последовательность генома.
	 * @type {Sequence}
	 */
	public abstract readonly sequence: Sequence

	/**
	 * Получить текущий или определенный код генома.
	 * @param {number} offset
	 * @returns {number}
	 */
	public abstract readCode(offset?: number): number

	/**
	 * Перейти на несколько кодов вперед.
	 * @param {number} offset
	 */
	public abstract jump(offset?: number): void
}