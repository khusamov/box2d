import {DataStorageFacade, Entity} from 'anubis-data-storage'
import {EdgeShapeData, FixtureData, RigidbodyData} from 'anubis-physic-system'
import {Rule} from 'anubis-rule-system'
import {Vec2} from 'planck'
import {EntityBoundaryData, THasPointInsideFunction} from '../../data/EntityBoundaryData'
import {IdentificationData} from '../../data/IdentificationData'
import {GameBoardCreation} from '../../messages/GameBoardCreation'

const gameEdge = {
	width: 70,
	height: 40
}

const extremeX = gameEdge.width / 2
const extremeY = gameEdge.height / 2

const edge: Array<[number, number, number, number]> = [
	[-extremeX, +extremeY, +extremeX, +extremeY],
	[-extremeX, -extremeY, -extremeX, +extremeY],
	[+extremeX, -extremeY, +extremeX, +extremeY],
	//[-ox, -oy, +ox, -oy],
]

const hasPointInside: THasPointInsideFunction = ({x, y}) => x > -extremeX && x < extremeX && y > -extremeY && y < extremeY

/**
 * @event GameBoardCreation
 */
export class GameBoardStartRule extends Rule {
	// TODO Сделать вызов start во время init(), а не как сейчас во время UpdateMessage.
	//  Это позволит отлавливать сообщение ResizeMessage.
	protected execute(): void {
		const gameBoardEntity = new Entity(
			new IdentificationData({type: 'GameBoard'}),
			new EntityBoundaryData(hasPointInside),
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