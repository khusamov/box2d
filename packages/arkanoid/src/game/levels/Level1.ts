import {ILevel} from '../base/interfaces/ILevel';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {IGameLifeCycle} from '../base/interfaces/IGameLifeCycle';
import {PlanckWorldRule} from '../rules/PlanckWorldRule';
import {Vec2} from 'planck';
import {RigidbodyCreatorRule} from '../rules/RigidbodyCreatorRule';
import {Entity} from '../base/Entity';
import {Rigidbody} from '../data/Rigidbody';
import {EdgeShape} from '../data/EdgeShape';
import {BoxShape} from '../data/BoxShape';
import {CircleShape} from '../data/CircleShape';

export class Level1 implements ILevel {
	public get ruleList() {
		return [
			new PlanckWorldRule(new Vec2(0, 0)),
			new RigidbodyCreatorRule
		]
	}

	public init(game: IGameEnvironment & IGameLifeCycle) {
		const gameEdge = {
			width: 70,
			height: 40
		}

		game.entityList.push(
			new Entity('GameEdge1', [
				new Rigidbody('static', 0, 0),
				new EdgeShape(-gameEdge.width / 2, -gameEdge.height / 2, -gameEdge.width / 2, gameEdge.height / 2)
			]),
			new Entity('GameEdge2', [
				new Rigidbody('static', 0, 0),
				new EdgeShape(gameEdge.width / 2, -gameEdge.height / 2, gameEdge.width / 2, gameEdge.height / 2)
			]),
			new Entity('GameEdge3', [
				new Rigidbody('static', 0, 0),
				new EdgeShape(-gameEdge.width / 2, -gameEdge.height / 2, gameEdge.width / 2, -gameEdge.height / 2)
			]),
			new Entity('GameEdge4', [
				new Rigidbody('static', 0, 0),
				new EdgeShape(-gameEdge.width / 2, gameEdge.height / 2, gameEdge.width / 2, gameEdge.height / 2)
			])
		)

		const baseballBatOffsetY = -15

		game.entityList.push(
			new Entity('BaseballBat', [
				new Rigidbody('dynamic', 0, baseballBatOffsetY),
				new BoxShape(4, 0.5, 1)
			])
		)

		game.entityList.push(
			new Entity('Ball', [
				new Rigidbody('dynamic', 0, 1 + baseballBatOffsetY),
				new CircleShape(0.5, 1)
			])
		)

		game.entityList.push(...createBricks({y: 10}))

		return game
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

function createBricks(parameters: IBrickWallParameters = {}) {
	const result = []
	const {rows = 5, cols = 10, padding = 1, x = 0, y = 0, width = 5, height = 1} = parameters

	const offsetCenterX = cols * width / 2 + (cols - 1) * padding / 2 - width / 2
	const offsetCenterY = rows * height / 2 + (rows - 1) * padding / 2 - height / 2

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			result.push(createBrick(
				cols * row + col,
				-offsetCenterX + x + col * (width + padding),
				-offsetCenterY + y + row * (height + padding),
				width, height
			))
		}
	}
	return result
}

function createBrick(index: number, x: number, y: number, width: number, height: number) {
	return new Entity('Brick#' + index, [
		new Rigidbody('static', x, y),
		new BoxShape(width / 2, height / 2, 1)
	])
}