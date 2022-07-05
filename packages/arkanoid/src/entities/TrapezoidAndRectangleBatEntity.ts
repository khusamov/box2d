import {BatEntity, IBatEntityParameters} from './BatEntity'
import {PolygonShapeData} from 'anubis-physic-system'
import {IsoscelesTrapezoidAndRectangle} from '../classes/IsoscelesTrapezoidAndRectangle'

export class TrapezoidAndRectangleBatEntity extends BatEntity {
	public constructor(parameters: IBatEntityParameters = {}) {
		super(
			parameters,
			new PolygonShapeData(
				undefined,
				...new IsoscelesTrapezoidAndRectangle
			)
		)
	}
}