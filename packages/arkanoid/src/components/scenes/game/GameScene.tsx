import {Game} from 'anubis-game-system'
import {FloatPanel} from '../../panel/FloatPanel'
import {GameCanvas} from './GameCanvas'
import {GameSceneStyle} from './GameScene.module.scss'
import {useScore} from './useScore'

interface IGameSceneProps {
	game: Game
}

export function GameScene({game}: IGameSceneProps) {
	const score = useScore(game)

	return (
		<div className={GameSceneStyle}>
			<GameCanvas game={game}/>
			<FloatPanel>Счет: {score}</FloatPanel>
		</div>
	)
}