import {Vec2, World} from 'planck'
import {Data} from 'anubis-data-storage'
import {IWorldDef} from '../interfaces/IWorldDef'

const defaultWorldDef: Readonly<IWorldDef> = {
	gravity: Vec2(0, 0),
	blockSolve: true
}

/**
 * Данные для создания мира физической симуляции Planck.
 */
export class PhysicWorldData extends Data {
	public readonly worldDef: IWorldDef

	public constructor(
		worldDef?: IWorldDef,
		public readonly world?: World
	) {
		super()
		this.worldDef = Object.assign({}, defaultWorldDef, worldDef)
	}
}