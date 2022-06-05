import {World} from 'planck'
import {Data} from 'anubis-game-system'
import {IWorldDef} from '../interfaces/IWorldDef'

export class PhysicWorldData extends Data {
	constructor(
		public readonly worldDef: IWorldDef,
		public readonly world?: World
	) {
		super()
	}
}