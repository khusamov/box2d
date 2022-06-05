import {Message} from 'anubis-game-system'
import {World} from "planck";
import {PhysicWorldData} from '../data/PhysicWorldData'

/**
 * Сообщение о том, что физический мир симуляции создан.
 * Генерируется один раз.
 */
export class PhysicWorldCreationMessage extends Message {
	public constructor(
		public physicWorldData: PhysicWorldData
	) {
		super()
	}

	/**
	 * Ссылка на созданный мир.
	 */
	public get world(): World {
		if (!this.physicWorldData.world) {
			throw new Error('Мир в этом сообщении должен быть уже определен')
		}
		return this.physicWorldData.world
	}
}