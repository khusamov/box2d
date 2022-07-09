import {PropsWithChildren} from 'react'
import {AnimateScale} from './AnimateScale'

interface IScaleAnimatedGroupProps {
	scale: number
	onAnimationEnd?: () => void
}

export function ScaleAnimatedGroup({children, scale, onAnimationEnd = () => {}}: PropsWithChildren<IScaleAnimatedGroupProps>) {
	return (
		<g>
			<AnimateScale scale={scale} onAnimationEnd={onAnimationEnd}/>
			{children}
		</g>
	)
}