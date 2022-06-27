import {useEffect} from 'react'

export function usePauseGame(game: {toggle: () => void}) {
	useEffect(() => {
		const onKeyPress = (event: KeyboardEvent) => {
			if (event.code === 'KeyP') {
				game.toggle()
			}
		}
		document.addEventListener('keypress', onKeyPress)
		return () => document.removeEventListener('keypress', onKeyPress)
	}, [])
}