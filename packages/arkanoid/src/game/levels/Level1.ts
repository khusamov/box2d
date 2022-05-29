import {ILevel} from '../base/interfaces/ILevel';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {IGameLifeCycle} from '../base/interfaces/IGameLifeCycle';
import {PlanckWorldRule} from '../rules/PlanckWorldRule';
import {Vec2} from 'planck';
import {Entity} from '../base/Entity';
import {Rigidbody} from '../data/Rigidbody';
import {EdgeShape} from '../data/EdgeShape';
import {BoxShape} from '../data/BoxShape';
import {CircleShape} from '../data/CircleShape';
import {Fixture} from '../data/Fixture';
import {Identification} from '../data/Identification';
import {Mouse} from '../data/Mouse';
import {BatPositionRule} from '../rules/BatPositionRule';
import {BallPositionRule} from '../rules/BallPositionRule';
import {PlanckEntityCreator} from '../rules/PlanckEntityCreator';
import {BallState, BallStateType} from '../data/BallState';
import {PolygonShape} from '../data/PolygonShape';

export class Level1 implements ILevel {
	public get ruleList() {
		return [
			new PlanckWorldRule(new Vec2(0, 0)),
			new PlanckEntityCreator,
			new BatPositionRule,
			new BallPositionRule
		]
	}

	public init(game: IGameEnvironment & IGameLifeCycle) {
		const gameEdge = {
			width: 70,
			height: 40
		}

		game.entityList.push(new Entity(new Mouse))

		game.entityList.push(
			new Entity(
				new Identification({type: 'Edge'}),
				new Rigidbody({type: 'static', position: new Vec2(0, 0)}),
				new EdgeShape(-gameEdge.width / 2, -gameEdge.height / 2, -gameEdge.width / 2, gameEdge.height / 2),
				new Fixture
			),
			new Entity(
				new Identification({type: 'Edge'}),
				new Rigidbody({type: 'static', position: new Vec2(0, 0)}),
				new EdgeShape(gameEdge.width / 2, -gameEdge.height / 2, gameEdge.width / 2, gameEdge.height / 2),
				new Fixture
			),
			new Entity(
				new Identification({type: 'Edge'}),
				new Rigidbody({type: 'static', position: new Vec2(0, 0)}),
				new EdgeShape(-gameEdge.width / 2, -gameEdge.height / 2, gameEdge.width / 2, -gameEdge.height / 2),
				new Fixture
			),
			new Entity(
				new Identification({type: 'Edge'}),
				new Rigidbody({type: 'static', position: new Vec2(0, 0)}),
				new EdgeShape(-gameEdge.width / 2, gameEdge.height / 2, gameEdge.width / 2, gameEdge.height / 2),
				new Fixture
			)
		)

		const batOffsetY = -15

		// Бита.
		game.entityList.push(
			new Entity(
				new Identification({type: 'Bat'}),
				new Rigidbody({type: 'kinematic', position: new Vec2(0, batOffsetY), fixedRotation: true}),
				new Fixture({density: 1, friction: 0}),
				new PolygonShape(
					new Vec2(-4.5, -1.5),
					new Vec2(-4.5, 0.5),
					new Vec2(-1.5, 1.5),
					new Vec2(1.5, 1.5),
					new Vec2(4.5, 0.5),
					new Vec2(4.5, -1.5),
				)
			)
		)

		// Мячик.
		game.entityList.push(
			new Entity(
				new Identification({type: 'Ball'}),
				new Rigidbody({type: 'dynamic', position: new Vec2(0, 1 + batOffsetY)}),
				new CircleShape(0.7),
				new Fixture({density: 1, restitution: 1, friction: 0}),
				new BallState(BallStateType.Stopped)
			)
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
	const {rows = 5, cols = 8, padding = 0.5, x = 0, y = 0, width = 7, height = 2} = parameters

	const offsetCenterX = cols * width / 2 + (cols - 1) * padding / 2 - width / 2
	const offsetCenterY = rows * height / 2 + (rows - 1) * padding / 2 - height / 2

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			result.push(createBrick(
				-offsetCenterX + x + col * (width + padding),
				-offsetCenterY + y + row * (height + padding),
				width, height
			))
		}
	}
	return result
}

function createBrick(x: number, y: number, width: number, height: number) {
	return new Entity(
		new Identification({type: 'Brick'}),
		new Rigidbody({type: 'static', position: new Vec2(x, y)}),
		new BoxShape(width, height),
		new Fixture({density: 1})
	)
}