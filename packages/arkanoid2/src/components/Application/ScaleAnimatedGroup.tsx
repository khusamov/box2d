import {PropsWithChildren} from 'react'
import {AnimateScale} from './AnimateScale'

interface IScaleAnimatedGroupProps {
	scale: number
}

export function ScaleAnimatedGroup({children, scale}: PropsWithChildren<IScaleAnimatedGroupProps>) {
	return (
		<g>
			<AnimateScale scale={scale}/>
			{children}
		</g>
	)
}