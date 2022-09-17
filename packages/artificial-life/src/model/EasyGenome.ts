import {map} from '../functions/map'
import {Genome} from './Genome'
import {NotDefineCodeError} from './NotDefineCodeError'
import {Sequence} from './Sequence'

export class EasyGenome extends Genome {
	private readonly _sequence: Sequence
	private currentCodeIndex: number = 0
	private stack: number[] = []

	public get sequence(): Sequence {
		return this._sequence
	}

	public constructor(sequence: Sequence) {
		super()
		this._sequence = sequence
	}

	public readCode(offset: number = 0, mapping?: [number, number]): number {
		const index = (this.currentCodeIndex + offset) % this.sequence.length
		const code = this.sequence.at(index)
		if (code === undefined) {
			throw new NotDefineCodeError(this, index)
		}
		return (
			mapping
				? map(code, 0, this.sequence.maximum, mapping[0], mapping[1])
				: code
		)
	}

	public jump(offset: number = 1): void {
		this.currentCodeIndex = (this.currentCodeIndex + offset) % this.sequence.length
	}

	public interrupt(index: number): void {
		const stackMax = 20
		if (this.stack.push(this.currentCodeIndex) > stackMax) {
			this.stack.shift()
		}
		this.currentCodeIndex = 0
		this.jump(Math.round(index * this.sequence.length / 20))
	}

	public return(): void {
		const index = this.stack.pop()
		if (index !== undefined) {
			this.currentCodeIndex = index
		}
	}
}