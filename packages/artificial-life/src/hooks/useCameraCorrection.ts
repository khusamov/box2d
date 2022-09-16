import {ISize} from 'base-types'

const mirrorY = (height: number) => `scale(1, -1), translate(0, -${height})`

interface ICameraCorrectionOptions {
	mirrorY?: boolean
	translateToCenter?: boolean
}

const defaultCameraCorrectionOptions: ICameraCorrectionOptions = {
	mirrorY: true,
	translateToCenter: true
}

export function useCameraCorrection(screenSize: ISize, options: ICameraCorrectionOptions = {}) {
	options = Object.assign({}, defaultCameraCorrectionOptions, options)
	const cameraTransform = [
		...options.mirrorY ? [mirrorY(screenSize.height)] : [],
		...options.translateToCenter ? [`translate(${screenSize.width / 2}, ${screenSize.height / 2})`] : []
	]
	return cameraTransform.join(', ')
}