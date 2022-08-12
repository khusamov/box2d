import {useState} from 'react'
import {BatMovingType, PilotLevel} from '../../game/levels/PilotLevel'
import {useRequestAnimationFrame} from '../../hooks/useRequestAnimationFrame'
import {GameScene} from '../scenes/game/GameScene'
import {useGame} from '../scenes/game/useGame'
import {SuperMario} from '../scenes/intro/SuperMario'

enum Scene {
	Intro,
	Game
}

export function Application() {
	const [scene, setScene] = useState(Scene.Intro)
	const level = new PilotLevel({movingType: BatMovingType.Hard})
	const game = useGame(level)
	useRequestAnimationFrame(timeInterval => game?.update(timeInterval))

	switch (scene) {
		case Scene.Intro: return <SuperMario onStart={() => setScene(Scene.Game)}/>
		case Scene.Game: return game ? <GameScene game={game}/> : null
		default: return null
	}
}