import {PropsWithChildren, useRef} from 'react'
import useResizeObserver from 'use-resize-observer'

interface IMeasurerProps {
	onResize: (width: number, height: number) => void
}

export function Measurer({children, onResize}: PropsWithChildren<IMeasurerProps>) {
	const ref = useRef<SVGGElement>(null)
	useResizeObserver({
		ref,
		onResize: ({width = 0, height = 0}) => onResize(width, height)
	})
	return (
		<g ref={ref}>
			{children}
		</g>
	)
}