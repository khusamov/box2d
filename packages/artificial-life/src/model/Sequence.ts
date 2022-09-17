import {SimpleArray} from 'base-types'
import {getRandomInt} from '../functions/getRandomInt'

/**
 * @deprecated
 */
interface ICreateSequenceItemFunction {
	(maximum: number): number
}

/**
 * @deprecated
 */
const defaultCreateSequenceItemFunction: ICreateSequenceItemFunction = maximum => getRandomInt(0, maximum)

/**
 * Последовательность положительных целых чисел.
 */
export class Sequence extends SimpleArray<number> {
	/**
	 * @deprecated Используйте класс RandomSequence.
	 */
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

export class RandomSequence extends Sequence {
	public constructor(length: number, maximum: number = Number.MAX_SAFE_INTEGER) {
		super()
		for (let i: number = 0; i < length; i++) {
			this[i] = getRandomInt(0, maximum)
		}
	}
}

export class FrequencyDistributionSequence extends Sequence {
	public constructor(length: number, frequencyDistribution: number[] = []) {
		super()
		for (let i: number = 0; i < length; i++) {
			const distribution: number[] = []
			frequencyDistribution.forEach(
				(frequency, index) => {
					distribution.push(...Array(frequency).fill(index))
				}
			)
			this[i] = distribution[getRandomInt(0, distribution.length - 1)] as number
		}
	}
}