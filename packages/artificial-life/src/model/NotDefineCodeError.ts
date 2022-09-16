import {Genome} from './Genome'

export class NotDefineCodeError extends Error {
	public constructor(genome: Genome, index: number) {
		console.warn('index', index)
		console.warn('sequence', genome.sequence)
		console.warn('genome', genome)
		super('Не определен код команды')
	}
}