export class Energy {
	private _value: number = 0
	private readonly maximum: number

	public constructor(value: number = 0, maximum: number = 1000) {
		this.maximum = Math.round(maximum)
		this.increase(value)
	}

	public get value(): number {
		return this._value
	}

	/**
	 * Уровень энергии. Равен числу от 0 до 1.
	 * @returns {number}
	 */
	public get level(): number {
		return this._value / this.maximum
	}

	public decrease(value: number) {
		this._value -= Math.round(value)
		if (this._value < 0) this._value = 0
	}

	/**
	 * Увеличить энергию.
	 * @param {number} value
	 * @returns {number} Возвращает количестве неусвоенной энергии.
	 */
	public increase(value: number): number {
		this._value += Math.round(value)
		let rest = 0
		if (this._value > this.maximum) {
			rest = this._value - this.maximum
			this._value = this.maximum
		}
		return rest
	}
}