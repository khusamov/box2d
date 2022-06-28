import {BatEntity} from './BatEntity'
import {PolygonShapeData} from 'anubis-physic-system'
import {IsoscelesTrapezoidAndRectangle} from '../classes/IsoscelesTrapezoidAndRectangle'

export class TrapezoidAndRectangleBatEntity extends BatEntity {
	public constructor() {
		super(
			new PolygonShapeData(
				undefined,
				...new IsoscelesTrapezoidAndRectangle
			)
		)
	}
}