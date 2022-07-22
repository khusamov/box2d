import {Level} from 'anubis-rule-system'
import {FloatPanel} from '../../panel/FloatPanel'
import {GameCanvas} from './GameCanvas'
import {GameSceneStyle} from './GameScene.module.scss'
import {useScore} from './useScore'
import {useGame} from './useGame'
import {useRequestAnimationFrame} from '../../../hooks/useRequestAnimationFrame'

interface IGameSceneProps {
	level: Level
}

export function GameScene({level}: IGameSceneProps) {
	const game = useGame(level)
	const score = useScore(game)
	useRequestAnimationFrame(timeInterval => game?.update(timeInterval))

	return !game ? null : (
		<div className={GameSceneStyle}>
			<GameCanvas game={game}/>
			<FloatPanel>
				Счет: {score}
			</FloatPanel>
		</div>
	)
}