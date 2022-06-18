import {SuperMarioStyle} from './SuperMario.module.scss'
import {useEffect, useRef} from 'react'
import {SuperMarioParticleEffect} from './SuperMarioParticleEffect'

const effect = new SuperMarioParticleEffect

/**
 * @link https://codepen.io/franksLaboratory/pen/WNdPPVz
 * @link https://parceljs.org/languages/javascript/#url-dependencies
 */
export function SuperMario() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)
	useEffect(() => {
		return () => effect.destroy()
	}, [])
	const onImageLoad = () => {
		if (canvasRef.current && imageRef.current) {
			effect.init(canvasRef.current, imageRef.current)
		}
	}
	return (
		<div className={SuperMarioStyle}>
			<canvas ref={canvasRef}/>
			<img ref={imageRef} alt='SuperMario' onLoad={onImageLoad} src={new URL('./arkanoid.png', import.meta.url).href}/>
		</div>
	)
}