import {Adapter} from '../../anubis-game-system/classes/Adapter'
import {IWorldDef} from '../interfaces/IWorldDef'
import {Vec2} from 'planck'

export class WorldDefAdapter extends Adapter implements IWorldDef {
	public get gravity(): Vec2 | undefined {
		return this.get('gravity')
	}

	public set gravity(value: Vec2 | undefined) {
		this.set('gravity', value)
	}
}