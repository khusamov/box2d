import {StartRule} from 'anubis-game-system-2'
import {DataStorageFasade, Entity, IDataStorage} from 'anubis-data-storage'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {IWorldDef} from '../interfaces/IWorldDef'

/**
 * Перед началом игры создается мир физической симуляции Planck.
 */
export class PhysicWorldStartRule extends StartRule {
	public constructor(private readonly worldDef?: IWorldDef) {
		super()
	}

	protected start(dataStorage: IDataStorage): void {
		new DataStorageFasade(dataStorage).addEntity(
			new Entity(new PhysicWorldData(this.worldDef))
		)
	}
}