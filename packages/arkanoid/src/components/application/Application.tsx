import {useState} from 'react'
import {GameCreator} from 'anubis-game-system'
import {GameScene} from '../scenes/game/GameScene'
import {SuperMario} from '../scenes/intro/SuperMario'
import {PilotLevel} from '../../game/levels/PilotLevel'

enum Scene {
	Intro,
	Game
}

export function Application() {
	const [scene, setScene] = useState(Scene.Intro)

	switch (scene) {
		case Scene.Intro:
			const onStart = () => setScene(Scene.Game)
			return <SuperMario onStart={onStart}/>
		case Scene.Game:
			const game = new GameCreator(new PilotLevel).create()
			game.init()
			game.start()
			return <GameScene game={game}/>
		default: return null
	}
}