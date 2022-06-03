import {EffectCallback, useEffect, useRef, useState} from 'react';

const useSingleEffect = (effect: EffectCallback) => useEffect(effect, [])

interface IUpdateFunction {
	/**
	 * Функция обновления игровой логики.
	 * @param timeInterval Промежуток между вызовами функции update().
	 */
	(timeInterval: DOMHighResTimeStamp): void
}

interface IUseRafParameters {
	/**
	 * Частота обновления игровой логики.
	 * Количество вызовов функции update() в секунду.
	 * @default 60
	 */
	updatePerSecond: number

	/**
	 * Функция обновления игровой логики.
	 */
	update: IUpdateFunction
}

interface IUseRafResult {
	/**
	 * Частота обновления экрана.
	 */
	framesPerSecond: number

	/**
	 * Интервал времени между вызовами render().
	 */
	timeInterval: number

	/**
	 * Временное соотношение для вычисления линейной интерполяции.
	 */
	interpolationRatio: number
}

/**
 * Бесконечный запрос кадров анимации для текущего компонента.
 * Если компонент уничтожается, то запрос автоматически отменяется.
 * Возвращает мгновенный FPS и время с начала анимации в миллисекундах.
 */
export function useRequestAnimationFrame({update, updatePerSecond = 60}: IUseRafParameters): IUseRafResult {
	const updateFixedTimeInterval = 1 / updatePerSecond * 1000
	const frameRef = useRef(0)
	const previousTimeRef = useRef(0)
	const updateTimeDelayRef = useRef(0)

	const [timeInterval, setTimeInterval] = useState(0)
	const [framesPerSecond, setFramesPerSecond] = useState(0)

	useSingleEffect(() => {
		const render = (time: DOMHighResTimeStamp) => {
			const timeInterval = time - previousTimeRef.current
			setFramesPerSecond(1000 / (time - previousTimeRef.current))

			updateTimeDelayRef.current += timeInterval
			while (updateTimeDelayRef.current > updateFixedTimeInterval) {
				updateTimeDelayRef.current -= updateFixedTimeInterval
				update(updateFixedTimeInterval)
			}

			previousTimeRef.current = time
			setTimeInterval(timeInterval)
			frameRef.current = requestAnimationFrame(render)
		}
		frameRef.current = requestAnimationFrame(render)
		return () => cancelAnimationFrame(frameRef.current)
	})

	const interpolationRatio = updateTimeDelayRef.current * updatePerSecond / 1000
	return {framesPerSecond, timeInterval, interpolationRatio}
}