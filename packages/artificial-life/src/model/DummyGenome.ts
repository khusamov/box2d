import {Genome} from './Genome'
import {Sequence} from './Sequence'

export class DummyGenome extends Genome {
	public readonly sequence: Sequence = new Sequence
	public jump(): void {}
	public readCode(): number {
		return 0
	}
}