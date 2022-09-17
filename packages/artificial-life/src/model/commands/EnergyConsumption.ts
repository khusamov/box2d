import {SimpleArray} from 'base-types'

/**
 * Массив сил, которые были использованы в команде бота.
 * Используется для расчете израсходованной энергии бота.
 */
export class EnergyConsumption extends SimpleArray<number> {
	public get value(): number {
		return this.reduce((result, item) => result + item, 0)
	}

	public clear() {
		this.splice(0, this.length)
	}
}