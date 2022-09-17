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
	 * @param {[number, number]} mapping
	 * @returns {number}
	 */
	public abstract readCode(offset?: number, mapping?: [number, number]): number

	/**
	 * Перейти на несколько кодов вперед.
	 * @param {number} offset
	 */
	public abstract jump(offset?: number): void

	/**
	 * Прерывание.
	 * @param {number} index
	 */
	public abstract interrupt(index: number): void

	/**
	 * Возврат из прерывания.
	 */
	public abstract return(): void
}