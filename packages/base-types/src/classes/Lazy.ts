import {ICreator} from '../interfaces';

type TCreateFunction<T> = () => T

/**
 * Отложенная инициализация.
 * @link https://metanit.com/sharp/tutorial/20.1.php
 * @link https://docs.microsoft.com/ru-ru/dotnet/api/system.lazy-1?view=net-5.0
 */
export class Lazy<T> {
	#value: T | undefined
	#creator: ICreator<T>

	constructor(createFn: TCreateFunction<T>) {
		this.#creator = {
			create(): T {
				return createFn()
			}
		}
	}

	get value(): T {
		if (!this.#value) {
			// Инициализация производится при первом обращении к value.
			this.#value = this.#creator.create()
		}
		return this.#value
	}
}