export class Vector3 {
	/**
	 * Конструктор вектора.
	 * @param x
	 * @param y
	 * @param z
	 */
	public constructor(
		public readonly x: number = 0,
		public readonly y: number = 0,
		public readonly z: number = 0
	) {}

	/**
	 * Векторное произведение.
	 * @link https://docs.unity3d.com/ru/530/Manual/UnderstandingVectorArithmetic.html
	 * @link https://ppt-online.org/366776 (Слайд № 8)
	 * @param vector
	 */
	public cross(vector: Vector3): Vector3 {
		return new Vector3(
			this.y * vector.z - this.z * vector.y,
			this.z * vector.x - this.x * vector.z,
			this.x * vector.y - this.y * vector.x
		)
	}

	/**
	 * Умножение вектора на число.
	 */
	public scale(scale: number): Vector3

	/**
	 * Масштабирование вектора с разными коэффициентами.
	 */
	public scale(scale: Vector3): Vector3

	/**
	 * Умножение на число или масштабирование вектором.
	 * @param scale
	 */
	public scale(scale: number | Vector3): Vector3 {
		return (
			scale instanceof Vector3
				? new Vector3(this.x * scale.x, this.y * scale.y, this.z * scale.z)
				: new Vector3(this.x * scale, this.y * scale, this.z * scale)
		)
	}

	public clone() {
		return new Vector3(this.x, this.y, this.z)
	}

	public toArray() {
		return [this.x, this.y, this.z]
	}

	public toString(digits: number = 2) {
		return `[${this.x.toFixed(digits)}, ${this.y.toFixed(digits)}, ${this.z.toFixed(digits)}]`
	}
}