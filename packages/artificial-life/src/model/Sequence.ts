import {SimpleArray} from 'base-types'
import {getRandomInt} from '../functions/getRandomInt'

/**
 * Последовательность положительных целых чисел.
 * У этой последовательности обязательно задано максимальное значение.
 */
export class Sequence extends SimpleArray<number> {
	public static createRandom(length: number, maximum: number): Sequence {
		const sequence: Sequence = new Sequence(maximum)
		for (let i: number = 0; i < length; i++) {
			sequence[i] = getRandomInt(0, maximum)
		}
		return sequence
	}

	public constructor(
		/**
		 * Максимальное значение последовательности.
		 */
		public readonly maximum: number
	) {
		super()
	}
}