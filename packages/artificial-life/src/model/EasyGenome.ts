import {codeCommandMap} from './BotVirtualMachine'
import {Genome} from './Genome'
import {NotDefineCodeError} from './NotDefineCodeError'
import {Sequence} from './Sequence'

export class EasyGenome extends Genome {
	private readonly _sequence: Sequence
	private programCounter: number = 0

	public get sequence(): Sequence {
		return this._sequence
	}

	public constructor(
		private length: number = 100,
		codeValueMaximum: number = (Object.keys(codeCommandMap).length - 1)
	) {
		super()
		this._sequence = Sequence.createRandom(length, codeValueMaximum)
	}

	public readCode(offset: number = 0): number {
		const index = (this.programCounter + offset) % this.length
		const code = this.sequence.at(index)
		if (code === undefined) {
			throw new NotDefineCodeError(this, index)
		}
		return code
	}

	public jump(offset: number = 1): void {
		this.programCounter = (this.programCounter + offset) % this.length
	}
}