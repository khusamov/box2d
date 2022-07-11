import {ISize} from 'base-types'
import {Message} from 'anubis-message-broker'

/**
 * Сообщение об изменении размеров экрана.
 */
export class ResizeMessage extends Message {
	public constructor(
		/**
		 * Новые размеры экрана.
		 * Внимание! Размеры задаются в единицах измерения экрана.
		 */
		public readonly size: ISize
	) {
		super()
	}
}