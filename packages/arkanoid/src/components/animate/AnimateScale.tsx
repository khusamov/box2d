import {useEffect, useState, RefCallback} from 'react'

interface IAnimateScaleProps {
	scale: number
	onAnimationEnd?: () => void
}

function useEndEventListener(onEndEvent: () => void): RefCallback<SVGElement | null> {
	const [svgElement, setSvgElement] = useState<SVGElement | null>(null)
	useEffect(() => {
		if (svgElement) {
			svgElement.addEventListener('endEvent', onEndEvent)
			return () => {
				svgElement.removeEventListener('endEvent', onEndEvent)
			}
		}
		return
	}, [svgElement])
	return setSvgElement
}


export function AnimateScale({scale, onAnimationEnd = () => {}}: IAnimateScaleProps) {
	const ref = useEndEventListener(onAnimationEnd) // TODO Заменить на useEventListener().
	return (
		scale === 1 ? null : (
			<animateTransform
				ref={ref}
				attributeName='transform'
				type='scale'
				fill='freeze'
				dur={0.5}
				from={1}
				to={scale}
			/>
		)
	)
}