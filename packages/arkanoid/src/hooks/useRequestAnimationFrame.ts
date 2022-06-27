import {useEffect, useRef, useState} from 'react';

const emptyFunction = () => {}
const fps = 60
const step = 1 / fps

/**
 * Игровой цикл взят по ссылке:
 * @link https://eatdog.com.ua/assets/gamedev-slides/demos/fixed-step.html
 * @param update Функция обновления логики игры.
 */
export function useRequestAnimationFrame(update: (step: number) => void): [number, number] {
	const [time, setTime] = useState(0)

	const frame = useRef(0)
	const last = useRef(performance.now())
	const dt = useRef(0)
	const render = useRef(emptyFunction)

	render.current = (
		() => {
			const now = performance.now();
			dt.current = dt.current + (now - last.current) / 1000
			while (dt.current > step) {
				dt.current = dt.current - step
				update(step)
			}
			setTime(now)
			last.current = now
			frame.current = requestAnimationFrame(render.current)
		}
	)

	useEffect(() => {
		frame.current = requestAnimationFrame(render.current)
		return () => cancelAnimationFrame(frame.current)
	}, [])

	return [dt.current * fps, time]
}