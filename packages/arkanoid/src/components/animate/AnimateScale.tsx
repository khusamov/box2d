interface IAnimateScaleProps {
	scale: number
	onAnimationEnd?: () => void
}

export function AnimateScale({scale, onAnimationEnd = () => {}}: IAnimateScaleProps) {
	return (
		scale === 1 ? null : (
			<animateTransform
				attributeName='transform'
				type='scale'
				fill='freeze'
				dur={0.5}
				from={1}
				to={scale}
				// В браузере Safari обработчик устанавливается (вроде), но событие не вызывается. Из-за этого пауза в игре не работает.
				onAnimationEnd={onAnimationEnd}
			/>
		)
	)
}