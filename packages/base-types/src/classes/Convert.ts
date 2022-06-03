import {IKeyValueObject} from '../interfaces';

type TMapConvertResult<K, V> = IKeyValueObject<K, V | undefined>[]
type TPlainObjectConvertResult<K, V> = IKeyValueObject<K, V>[]
type TToArrayConvertResult<K, V> = IKeyValueObject<K, V>[]

/**
 * Конвертация разнообразных значений.
 */
export class Convert {
	/**
	 * Конвертировать карту Map в массив key/value-объектов.
	 * @param object
	 */
	public static toArray<K, V>(object: Map<K, V>): TMapConvertResult<K, V>

	/**
	 * Конвертировать plain-объект в массив key/value-объектов.
	 * @param object
	 */
	public static toArray<K extends keyof any, V>(object: Record<K, V>): TPlainObjectConvertResult<K, V>

	/**
	 * Конвертировать карту или plain-объект в массив key/value-объектов.
	 * @param object
	 */
	public static toArray<K extends keyof any, V>(object: Map<K, V> | Record<K, V>): TToArrayConvertResult<K, V> {
		const result: TToArrayConvertResult<K, V> = []
		if (object instanceof Map) {
			for (const [key, value] of object) {
				result.push({key, value})
			}
		} else {
			for (const key in object) {
				if (object.hasOwnProperty(key)) {
					result.push({key, value: Reflect.get(object, key)})
				}
			}
		}
		return result
	}

	/**
	 * Конвертировать миллисекунды в секунды.
	 * @param millisecond
	 */
	public static toSecond(millisecond: number) {
		return millisecond / 1000
	}

	/**
	 * Конвертация угла из радиан в градусы.
	 * @param value
	 */
	public static toDegree(value: number) {
		return value / Math.PI * 180
	}

	/**
	 * Конвертация угла из градусов в радианы.
	 * @param value
	 */
	public static toRadian(value: number) {
		return value * Math.PI / 180
	}
}