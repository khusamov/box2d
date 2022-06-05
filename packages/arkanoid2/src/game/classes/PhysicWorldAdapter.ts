import {Adapter} from '../../anubis-game-system/classes/Adapter'
import {IPhysicWorld} from '../interfaces/IPhysicWorld'
import {World} from 'planck'

export class PhysicWorldAdapter extends Adapter implements IPhysicWorld {
	public get world(): World {
		return this.get('world')
	}

	public set world(value: World) {
		this.set('world', value)
	}
}