import {StartMessage, StartRule} from 'anubis-game-system-2'
import {DataStorageFasade, Entity} from 'anubis-data-storage'
import {PhysicWorldData} from 'anubis-physic-system'

export class PhysicWorldStartRule extends StartRule {
	protected start({dataStorage}: StartMessage): void {
		new DataStorageFasade(dataStorage).addEntity(
			new Entity(new PhysicWorldData)
		)
	}
}