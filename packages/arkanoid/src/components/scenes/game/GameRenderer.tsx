import {Game} from 'anubis-game-system'
import {DataStorageFacade, isData} from 'anubis-data-storage'
import {PhysicWorldData} from 'anubis-physic-system'
import {PlanckRenderer} from '../../renderer/PlanckRenderer'

interface IGameRendererProps {
	game: Game
}

export function GameRenderer({game}: IGameRendererProps) {
	const dataStorageFacade = new DataStorageFacade(game.context.dataStorage)
	const world = dataStorageFacade.find(isData(PhysicWorldData))?.world
	return !world ? null : (
		<PlanckRenderer world={world}/>
	)
}