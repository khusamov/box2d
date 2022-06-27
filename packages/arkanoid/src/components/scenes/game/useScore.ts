import {GameScoreData} from '../../../game/data/GameScoreData'
import {Game} from 'anubis-game-system'
import {DataStorageFasade, isData} from 'anubis-data-storage'

export function useScore(game: Game | undefined): number {
	const defaultScore = 0
	if (!game) return defaultScore
	const dataStorageFasade = new DataStorageFasade(game.dataStorage)
	return dataStorageFasade.find(isData(GameScoreData))?.score || defaultScore
}