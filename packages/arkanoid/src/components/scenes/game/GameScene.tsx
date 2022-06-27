import {Level} from 'anubis-rule-system'
import {FloatPanel} from '../../panel/FloatPanel'
import {useDisableContextMenu} from '../../../hooks/useDisableContextMenu'
import {GameCanvas} from './GameCanvas'
import {GameSceneStyle} from './GameScene.module.scss'
import {useScore} from './useScore'
import {useGame} from './useGame'

interface IGameSceneProps {
	level: Level
}

export function GameScene({level}: IGameSceneProps) {
	const onContextMenu = useDisableContextMenu()
	const game = useGame(level)
	const score = useScore(game)

	return !game ? null : (
		<div className={GameSceneStyle} onContextMenu={onContextMenu}>
			<GameCanvas game={game}/>
			<FloatPanel>
				Счет: {score}
			</FloatPanel>
		</div>
	)
}