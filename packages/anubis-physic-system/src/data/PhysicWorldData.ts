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
	#worldDef: IWorldDef | undefined

	public constructor(
		worldDef?: IWorldDef,
		public readonly world?: World
	) {
		super()
		this.#worldDef = worldDef
	}

	public get worldDef(): IWorldDef | undefined {
		return this.#worldDef
	}

	public set worldDef(worldDef: IWorldDef | undefined) {
		this.#worldDef = Object.assign({}, defaultWorldDef, worldDef)
	}
}