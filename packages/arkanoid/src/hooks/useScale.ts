import {ISize} from 'base-types'
import {useState} from 'react'

export function useScale(screenSize: ISize, gameSize: ISize, scaleDecrement: number = 0.8) {
	const [scale, setScale] = useState(1)
	if (screenSize.width && screenSize.height && scale === 1) {
		if (screenSize.width / screenSize.height > gameSize.width / gameSize.height) {
			setScale(screenSize.height / gameSize.height * scaleDecrement)
		} else {
			setScale(screenSize.width / gameSize.width * scaleDecrement)
		}
	}
	return scale
}