import {SimpleArray} from 'base-types'
import {getRandomInt} from '../functions/getRandomInt'

interface ICreateSequenceItemFunction {
	(maximum: number): number
}

const defaultCreateSequenceItemFunction: ICreateSequenceItemFunction = maximum => getRandomInt(0, maximum)

/**
 * Последовательность положительных целых чисел.
 * У этой последовательности обязательно задано максимальное значение.
 */
export class Sequence extends SimpleArray<number> {
	public static createRandom(length: number, maximum: number, createItem: ICreateSequenceItemFunction = defaultCreateSequenceItemFunction): Sequence {
		const sequence: Sequence = new Sequence
		for (let i: number = 0; i < length; i++) {
			sequence[i] = createItem(maximum)
		}
		return sequence
	}

	/**
	 * Максимальное значение последовательности.
	 */
	public get maximum() {
		return Math.max(...this)
	}
}