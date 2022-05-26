import {Entity} from '../Entity';
import {EventEmitter} from 'events';

/**
 * Игровое окружение и состояние.
 * Доступно каждому правилу игры.
 */
export interface IGameEnvironment {
	/**
	 * Массив игровых объектов.
	 */
	readonly entityList: Entity[]

	/**
	 * Общая шина сообщений.
	 * Предназначена для связи правил друг с другом.
	 * Внимание, имена событий формировать по шаблону:
	 * <Имя правила>:<Имя события>
	 */
	readonly eventEmitter: EventEmitter
}