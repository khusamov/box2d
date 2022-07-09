import {Game} from 'anubis-game-system'
import {DataStorageFasade, isData} from 'anubis-data-storage/src'
import {PhysicWorldData} from 'anubis-physic-system/src'
import {PlanckRenderer} from '../../renderer/PlanckRenderer'

interface IGameRendererProps {
	game: Game
}

export function GameRenderer({game}: IGameRendererProps) {
	const dataStorageFasade = new DataStorageFasade(game.dataStorage)
	const world = dataStorageFasade.find(isData(PhysicWorldData))?.world
	return !world ? null : (
		<PlanckRenderer world={world}/>
	)
}