import {Body, Box, Circle, Shape, Vec2, World} from 'planck'
import {convertPlanckListToArray} from '../functions/convertPlanckListToArray'
import {getRandomInt} from '../functions/getRandomInt'
import {toRadian} from '../functions/toRadian'
import {Genome} from './Genome'

const botShapeDensity = 10
const type: 'circle' | 'box' = 'box'

export class Bot {
	private _weight: number = 0

	public constructor(
		public readonly genome: Genome,
		/**
		 * Допускается тело с одним креплением с фигурой Окружность.
		 * UserData содержит ссылку на экземпляр бота (класса Bot).
		 */
		public readonly body: Body,
		weight: number = 10,
		public readonly energy: number = 10
	) {
		this.weight = weight
		body.setUserData(this)
	}

	public get weight(): number {
		return this._weight
	}

	public set weight(weight: number) {
		this._weight = weight

		const fixture = convertPlanckListToArray(this.body.getFixtureList()).find(fixture => fixture.getShape() instanceof Box)
		if (fixture) {
			this.body.destroyFixture(fixture)
		}

		const botSize = weight / 30
		let botShape: Shape
		switch (type) {
			case 'circle':
				botShape = new Circle(botSize)
				break
			case 'box':
				botShape = new Box(botSize, botSize)
				break
		}
		this.body.createFixture(botShape, botShapeDensity)
	}
}

export function createBotBody(world: World, position: Vec2): Body {
	return world.createBody({
		type: 'dynamic',
		angle: toRadian(getRandomInt(0, 360)),
		position
	})
}