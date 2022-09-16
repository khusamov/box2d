import {Genome} from './Genome'
import {NotDefineCodeError} from './NotDefineCodeError'
import {Sequence} from './Sequence'

export class EasyGenome extends Genome {
	private readonly _sequence: Sequence
	private programCounter: number = 0

	public get sequence(): Sequence {
		return this._sequence
	}

	public constructor(sequence: Sequence) {
		super()
		this._sequence = sequence
	}

	public readCode(offset: number = 0): number {
		const index = (this.programCounter + offset) % this.sequence.length
		const code = this.sequence.at(index)
		if (code === undefined) {
			throw new NotDefineCodeError(this, index)
		}
		return code
	}

	public jump(offset: number = 1): void {
		this.programCounter = (this.programCounter + offset) % this.sequence.length
	}
}