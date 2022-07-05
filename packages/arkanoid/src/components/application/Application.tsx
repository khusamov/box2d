import {useState} from 'react'
import {GameScene} from '../scenes/game/GameScene'
import {SuperMario} from '../scenes/intro/SuperMario'
import {BatMovingType, PilotLevel} from '../../game/levels/PilotLevel'

enum Scene {
	Intro,
	Game
}

export function Application() {
	const [scene, setScene] = useState(Scene.Intro)

	switch (scene) {
		case Scene.Intro: return <SuperMario onStart={() => setScene(Scene.Game)}/>
		case Scene.Game: return <GameScene level={new PilotLevel({movingType: BatMovingType.Hard})}/>
		default: return null
	}
}