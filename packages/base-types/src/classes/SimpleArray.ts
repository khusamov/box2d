/**
 * Решение проблем с наследованием от штатного массива.
 * Избавляемся от необходимости использования таких конструкторов как:
 *
 * new(arrayLength?: number): any[];
 * new <T>(arrayLength: number): T[];
 * (arrayLength?: number): any[];
 * <T>(arrayLength: number): T[];
 *
 * Дело в том, что такие методы как filter и find создают новый массив как результат своей работы,
 * а создают массив не Array, а с того класса, который унаследован от Array.
 * И этот наследник не реализует интерфейс конструктора Array обычно, потому что программист
 * об это просто не помнит или не знает.
 */
export class SimpleArray<T> extends Array<T> {
	public constructor(...items: T[]) {
		super(...items)
	}

	public override filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[]
	public override filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[]
	public override filter() {
		return Array.from(this).filter(arguments[0], arguments[1])
	}

	public override find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined
	public override find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined
	public override find() {
		return Array.from(this).find(arguments[0], arguments[1])
	}
}