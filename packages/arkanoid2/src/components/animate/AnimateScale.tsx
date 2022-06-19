interface IAnimateScaleProps {
	scale: number
}

export function AnimateScale({scale}: IAnimateScaleProps) {
	return (
		scale === 1 ? null : (
			<animateTransform
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