import {Vec2} from 'planck'

export function createVec2(angle: number, length: number = 1): Vec2 {
	return new Vec2(
		length * Math.cos(angle),
		length * Math.sin(angle)
	)
}