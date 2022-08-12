import {Entity} from 'anubis-data-storage'
import {DataStorageFacade} from 'anubis-data-storage'
import {Rule} from 'anubis-rule-system'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {IWorldDef} from '../interfaces/IWorldDef'

/**
 * Перед началом игры создается мир физической симуляции Planck.
 */
export class PhysicWorldStartRule extends Rule {
	public constructor(private readonly worldDef?: IWorldDef) {
		super()
	}

	protected execute(): void {
		new DataStorageFacade(this.context.dataStorage).addEntity(
			new Entity(new PhysicWorldData(this.worldDef))
		)
	}
}