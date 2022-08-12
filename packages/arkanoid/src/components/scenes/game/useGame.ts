import {useEffect, useState} from 'react'
import {Level} from 'anubis-rule-system'
import {Game, GameCreator} from 'anubis-game-system'

export function useGame(level: Level): Game | undefined {
	const [game, setGame] = useState<Game>()
	useEffect(() => {
		const game = new GameCreator(level).create()
		game.start()
		setGame(game)
		return () => game.dispose()
	}, [])
	return game
}