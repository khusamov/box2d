import {IPoint} from '../interfaces';
import {Vector3} from './Vector3';

/*
 * Увеличить длину вектора можно так:
 * Vector.translate(Vector.identity.scale(length))
 * Будет создан новый вектор с измененной длиной.
 */

/**
 * Вектор.
 * @unmutable
 * @link https://github.com/khusamov/extjs-cad-2d/blob/master/packages/local/khusamov-svg/src/geometry/vector/Vector.js
 * @link https://github.com/khusamov/extjs-cad-2d/blob/master/packages/local/khusamov-svg/src/geometry/Point.js
 */
export class Vector implements IPoint {
	/**
	 * Расстояние от начала координат до точки.
	 */
	public static distance(point: IPoint): number {
		// noinspection JSSuspiciousNameCombination
		return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
	}

	/**
	 * Создать вектор на основе угла и длины.
	 */
	public static create(angle: number, length: number): Vector {
		return new Vector(
			length * Math.cos(angle),
			length * Math.sin(angle)
		)
	}

	/**
	 * Угол между вектором и положительной осью.
	 * Принимает значение от -Math.PI до Math.PI радиан.
	 */
	public get angle(): number {
		return Math.atan2(this.y, this.x)
	}

	/**
	 * Модуль (длина) вектора.
	 */
	public get length(): number {
		return Vector.distance(this)
	}

	/**
	 * Возвращает true, если вектор является нулевым.
	 */
	public get isNull(): boolean {
		return this.x === 0 && this.y === 0
	}

	/**
	 * Конструктор вектора.
	 * @param x
	 * @param y
	 */
	public constructor(
		public readonly x: number = 0,
		public readonly y: number = 0
	) {}

	/**
	 * Получить единичный вектор, равный по направлению исходному.
	 * Он же направляющий вектор (единичный, равный по направлению).
	 * Создается новый вектор, а исходный вектор не меняется.
	 */
	public get identity(): Vector {
		return (
			new Vector(
				Math.cos(this.angle),
				Math.sin(this.angle)
			)
		)
	}

	/**
	 * Получить обратный вектор (инверсия вектора).
	 */
	public get inverse(): Vector {
		return new Vector(-this.x, -this.y)
	}

	/**
	 * Нормаль вектора (единичный вектор, перпендикулярный исходному).
	 * Создается новый вектор, а исходный вектор не меняется.
	 */
	public get normal(): Vector {
		return this.clone().rotate(Math.PI / 2).identity
		// TODO Проверить эту формулу нахождения перпендикулярного вектора.
		/*
			a: 1 / parallel.x(),
			b: -1 / parallel.y(),
		*/
	}

	/**
	 * Сложение векторов.
	 * @param vector
	 */
	public translate(vector: Vector): Vector {
		return new Vector(
			this.x + vector.x,
			this.y + vector.y
		)
	}

	/**
	 * Вращение вектора.
	 * @param angle
	 */
	public rotate(angle: number) {
		return new Vector(
			this.x * Math.cos(angle) - this.y * Math.sin(angle),
			this.x * Math.sin(angle) + this.y * Math.cos(angle)
		)
	}

	/**
	 * Умножение вектора на число.
	 */
	public scale(scale: number): Vector

	/**
	 * Масштабирование вектора с разными коэффициентами.
	 */
	public scale(scale: Vector): Vector

	/**
	 * Умножение на число или масштабирование вектором.
	 * @param scale
	 */
	public scale(scale: number | Vector): Vector {
		return (
			scale instanceof Vector
				? new Vector(this.x * scale.x, this.y * scale.y)
				: new Vector(this.x * scale, this.y * scale)
		)
	}

	/**
	 * Скалярное произведение векторов.
	 *
	 * Скалярным произведением двух векторов называется число (скаляр),
	 * равное произведению длин этих векторов на косинус угла между ними.
	 * Длина вектора является его модулем.
	 *
	 * Скалярное произведение через компоненты.
	 * Скалярное произведение двух векторов равно сумме попарных произведений
	 * соответствующих компонент.
	 * @link https://bit.ly/3yCvHr6
	 * @param vector
	 */
	public dot(vector: Vector): number {
		return this.x * vector.x + this.y * vector.y
	}

	/**
	 * Векторное произведение.
	 * @param vector
	 */
	public cross(vector: Vector): Vector3 {
		return new Vector3(this.x, this.y, 0).cross(new Vector3(vector.x, vector.y, 0))
	}

	/**
	 * Взятие остатка от деления.
	 * @param vector
	 */
	public mod(vector: Vector): Vector {
		return new Vector(
			this.x % vector.x,
			this.y % vector.y
		)
	}

	/**
	 * Проекция вектора на вектор vector.
	 * @link https://bit.ly/3yCvHr6
	 * @param vector
	 */
	public project(vector: Vector): Vector {
		if (this.isNull || vector.isNull) {
			return new Vector(0, 0)
		}

		return vector.scale(this.dot(vector) / vector.dot(vector))
	}

	public clone() {
		return new Vector(this.x, this.y)
	}

	public toArray() {
		return [this.x, this.y]
	}

	public toString(digits: number = 2) {
		return `[${this.x.toFixed(digits)}, ${this.y.toFixed(digits)}]`
	}
}