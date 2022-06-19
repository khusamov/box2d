import {useState} from 'react'
import {GameScene} from '../game/GameScene'
import {SuperMario} from '../intro/SuperMario'

enum Scene {
	Intro,
	Game
}

export function Application() {
	const [scene, setScene] = useState(Scene.Intro)

	const onStart = () => setScene(Scene.Game)

	switch (scene) {
		case Scene.Intro: return <SuperMario onStart={onStart}/>
		case Scene.Game: return <GameScene/>
		default: return null
	}
}