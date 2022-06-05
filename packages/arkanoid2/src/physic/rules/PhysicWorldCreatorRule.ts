import {Vec2, World} from 'planck'
import {DataAddingMessage, DataFasade, Rule} from 'anubis-game-system'
import {IWorldDef} from '../interfaces/IWorldDef'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'

const defaultWorldDef: Readonly<IWorldDef> = {
	gravity: Vec2(0, 0),
	blockSolve: true
}

/**
 * @event PhysicWorldCreationMessage
 */
export class PhysicWorldCreatorRule extends Rule {
	public execute(): void {
		this.subscribe.once(DataAddingMessage, ({data}) => {
			if (data instanceof PhysicWorldData) {
				const physicWorldData = data

				if (physicWorldData.world) {
					throw new Error('Нельзя добавлять данные с определенным world')
				}

				const worldDef = Object.assign({}, defaultWorldDef, physicWorldData.worldDef)
				const nextPhysicWorldData = new PhysicWorldData(worldDef, new World(worldDef))

				new DataFasade(physicWorldData).replace(nextPhysicWorldData)
				this.emitter.emit(new PhysicWorldCreationMessage(nextPhysicWorldData))
			}
		})
	}
}