import {Entity} from 'anubis-data-storage'
import {DataStorageFacade} from 'anubis-data-storage/src'
import {Rule} from 'anubis-rule-system/src'
import {IdentificationData} from '../../data/IdentificationData'
import {EdgeShapeData, FixtureData, RigidbodyData} from 'anubis-physic-system'
import {Vec2} from 'planck'
import {GameBoardCreation} from '../../messages/GameBoardCreation'

const gameEdge = {
	width: 70,
	height: 40
}

const ox = gameEdge.width / 2
const oy = gameEdge.height / 2

const edge: Array<[number, number, number, number]> = [
	[-ox, +oy, +ox, +oy],
	[-ox, -oy, -ox, +oy],
	[+ox, -oy, +ox, +oy],
	//[-ox, -oy, +ox, -oy],
]

/**
 * @event GameBoardCreation
 */
export class GameBoardStartRule extends Rule {
	// TODO Сделать вызов start во время init(), а не как сейчас во время UpdateMessage.
	//  Это позволит отлавливать сообщение ResizeMessage.
	protected execute(): void {
		const gameBoardEntity = new Entity(
			new IdentificationData({type: 'GameBoard'}),
			new RigidbodyData({type: 'static', position: new Vec2(0, 0)}),
			...edge.map(([x1, y1, x2, y2]) => (
				new Entity(
					new EdgeShapeData(new Vec2(x1, y1), new Vec2(x2, y2)),
					new FixtureData
				)
			))
		)
		new DataStorageFacade(this.context.dataStorage).addEntity(gameBoardEntity)
		this.context.messageEmitter.emit(new GameBoardCreation(gameBoardEntity))
	}
}