import {PolygonShapeData} from 'anubis-physic-system'
import {Polygon, Vec2} from 'planck'

export class TrapezoidShapeData extends PolygonShapeData {
	public constructor(
		private readonly width: number = 11,
		private readonly height: number = 0.5,
		private readonly width2: number = 5,
		private readonly height2: number = 0.5,
		shape?: Polygon
	) {
		super(
			shape,
			new Vec2(-width / 2, -(height + height2) / 2),
			new Vec2(-width / 2, (height + height2) / 2 - height2),
			new Vec2(-width2 / 2, (height + height2) / 2),
			new Vec2(width2 / 2, (height + height2) / 2),
			new Vec2(width / 2, (height + height2) / 2 - height2),
			new Vec2(width / 2, -(height + height2) / 2),
		)
	}

	public override clone(shape?: Polygon): TrapezoidShapeData {
		return new TrapezoidShapeData(
			this.width,
			this.height,
			this.width2,
			this.height2,
			shape
		)
	}
}