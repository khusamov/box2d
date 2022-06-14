import {StartMessage, StartRule} from 'anubis-game-system-2'
import {DataStorageFasade, Entity} from 'anubis-data-storage'
import {IdentificationData} from '../../data/IdentificationData'
import {EdgeShapeData, FixtureData, RigidbodyData} from 'anubis-physic-system'
import {Vec2} from 'planck'

const gameEdge = {
	width: 70,
	height: 40
}

const ox = gameEdge.width / 2
const oy = gameEdge.height / 2

const edge: Array<[number, number, number, number]> = [
	[-ox, -oy, -ox, +oy],
	[+ox, -oy, +ox, +oy],
	[-ox, -oy, +ox, -oy],
	[-ox, +oy, +ox, +oy],
]

export class GameBoardStartRule extends StartRule {
	protected start({dataStorage}: StartMessage): void {
		new DataStorageFasade(dataStorage).addEntity(
			...edge.map(([x1, y1, x2, y2]) => (
				new Entity(
					new IdentificationData({type: 'Edge'}),
					new RigidbodyData({type: 'static', position: new Vec2(0, 0)}),
					new EdgeShapeData(new Vec2(x1, y1), new Vec2(x2, y2)),
					new FixtureData
				)
			))
		)
	}
}