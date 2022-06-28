import {PlanckVertexArray} from './PlanckVertexArray'
import {Vec2} from 'planck'

export class IsoscelesTrapezoidAndRectangle extends PlanckVertexArray {
	public constructor(
		width: number = 11,
		height: number = 0.5,
		width2: number = 5,
		height2: number = 0.5
	) {
		super(
			new Vec2(-width / 2, -(height + height2) / 2),
			new Vec2(-width / 2, (height + height2) / 2 - height2),
			new Vec2(-width2 / 2, (height + height2) / 2),
			new Vec2(width2 / 2, (height + height2) / 2),
			new Vec2(width / 2, (height + height2) / 2 - height2),
			new Vec2(width / 2, -(height + height2) / 2)
		)
	}
}