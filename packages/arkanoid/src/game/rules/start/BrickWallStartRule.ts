import {Vec2} from 'planck'
import {StartRule} from 'anubis-game-system-2'
import {DataStorageFasade, Entity, IDataStorage} from 'anubis-data-storage'
import {BoxShapeData, FixtureData, RigidbodyData} from 'anubis-physic-system'
import {IdentificationData} from '../../data/IdentificationData'

export class BrickWallStartRule extends StartRule {
	protected start(dataStorage: IDataStorage): void {
		new DataStorageFasade(dataStorage).addEntity(
			...createBrickEntityList({y: 10})
		)
	}
}

interface IBrickWallParameters {
	rows?: number
	cols?: number
	padding?: number
	x?: number
	y?: number
	width?: number
	height?: number
}

function createBrickEntityList(parameters: IBrickWallParameters = {}): Entity[] {
	const result: Entity[] = []
	const {rows = 5, cols = 8, padding = 0.5, x = 0, y = 0, width = 7, height = 2} = parameters

	const offsetCenterX = cols * width / 2 + (cols - 1) * padding / 2 - width / 2
	const offsetCenterY = rows * height / 2 + (rows - 1) * padding / 2 - height / 2

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			result.push(createBrickEntity(
				-offsetCenterX + x + col * (width + padding),
				-offsetCenterY + y + row * (height + padding),
				width, height
			))
		}
	}

	return result
}

function createBrickEntity(x: number, y: number, width: number, height: number) {
	return new Entity(
		new IdentificationData({type: 'Brick'}),
		new RigidbodyData({type: 'static', position: new Vec2(x, y)}),
		new BoxShapeData(width, height),
		new FixtureData({density: 1})
	)
}