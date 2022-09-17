import {Genome} from './Genome'

export class NotDefineCodeError extends Error {
	public constructor(genome: Genome, index: number) {
		console.warn('Попытка прочесть код с индексом:', index)
		console.warn('Последовательность в геноме:', genome.sequence.length ? genome.sequence : '<Пустая>')
		console.warn('Параметры генома:', genome)
		super('Не определен код генома')
	}
}