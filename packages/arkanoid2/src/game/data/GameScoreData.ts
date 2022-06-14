import {Data} from 'anubis-data-storage'

/**
 * Счет в игре.
 */
export class GameScoreData extends Data {
	public constructor(
		/**
		 * Счет в баллах.
		 */
		public readonly score: number = 0,
		/**
		 * Время последнего удара по кирпичику.
		 * Миллисекунды.
		 */
		public readonly time: number = 0
	) {
		super()
	}
}