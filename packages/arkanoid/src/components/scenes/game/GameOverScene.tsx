import {Game} from 'anubis-game-system'
import {useScore} from './useScore'

interface IGameOverSceneProps {
	game: Game
}

export function GameOverScene({game}: IGameOverSceneProps) {
	const score = useScore(game)

	return (
		<div>
			Игра проиграна. Ваш счет равен {score}.
		</div>
	)
}