import {MacroRule} from 'anubis-rule-system'
import {BoxShapeData, createBox} from '../data/BoxShapeData'
import {CircleShapeData, createCircle} from '../data/CircleShapeData'
import {createEdge, EdgeShapeData} from '../data/EdgeShapeData'
import {createPolygon, PolygonShapeData} from '../data/PolygonShapeData'
import {AbstractShapeCreatorRule} from './AbstractShapeCreatorRule'

export class ShapeCreatorRule extends MacroRule {
	public constructor() {
		super(
			new AbstractShapeCreatorRule(BoxShapeData, createBox),
			new AbstractShapeCreatorRule(CircleShapeData, createCircle),
			new AbstractShapeCreatorRule(EdgeShapeData, createEdge),
			new AbstractShapeCreatorRule(PolygonShapeData, createPolygon)
		)
	}
}