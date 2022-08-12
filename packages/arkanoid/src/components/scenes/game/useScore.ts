import {DataStorageFacade, isData} from 'anubis-data-storage'
import {Game} from 'anubis-game-system'
import {GameScoreData} from '../../../game/data/GameScoreData'

const emptyScore = 0

export function useScore(game: Game | undefined): number {
	if (!game) return emptyScore
	const dataStorageFacade = new DataStorageFacade(game.context.dataStorage)
	return dataStorageFacade.find(isData(GameScoreData))?.score || emptyScore
}