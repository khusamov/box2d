import {PropsWithChildren} from 'react'
import {CanvasStyle} from './Canvas.module.scss'

interface ICanvasProps {

}

export function Canvas({children}: PropsWithChildren<ICanvasProps>) {
	return (
		<svg className={CanvasStyle} version='1.1' xmlns='http://www.w3.org/2000/svg'>
			{children}
		</svg>
	)
}