import {useEffect, useState} from 'react'
import {BatMovingType, PilotLevel} from '../../game/levels/PilotLevel'
import {BallPlayOutMessage} from '../../game/messages/BallPlayOutMessage'
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame'
import {GameOverScene} from '../scenes/game/GameOverScene'
import {GameScene} from '../scenes/game/GameScene'
import {useGame} from '../scenes/game/useGame'
import {SuperMario} from '../scenes/intro/SuperMario'

enum Scene {
	Intro,
	Game,
	GameOver
}

export function Application() {
	const [scene, setScene] = useState(Scene.Intro)
	const level = new PilotLevel({movingType: BatMovingType.Hard})
	const game = useGame(level)
	useRequestAnimationFrame(timeInterval => game?.update(timeInterval))

	useEffect(() => {
		if (game) {
			game.context.messageEmitter.on(BallPlayOutMessage, () => {
				setScene(Scene.GameOver)
			})
		}
	}, [game])

	switch (scene) {
		case Scene.Intro: return <SuperMario onStart={() => setScene(Scene.Game)}/>
		case Scene.Game: return game ? <GameScene game={game}/> : null
		case Scene.GameOver: return game ? <GameOverScene game={game}/> : null
		default: return null
	}
}