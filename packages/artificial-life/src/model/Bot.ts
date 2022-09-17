import {Body, Box, Circle, Shape, Vec2, World} from 'planck'
import {convertPlanckListToArray} from '../functions/convertPlanckListToArray'
import {getRandomInt} from '../functions/getRandomInt'
import {toRadian} from '../functions/toRadian'
import {DummyGenome} from './DummyGenome'
import {Energy} from './Energy'
import {Genome} from './Genome'
import {Sensor, SensorActivateType} from './Sensor'

export class Bot {
	public readonly friction: number
	public readonly density: number
	public size: number
	public energy: Energy

	public constructor(
		public readonly genome: Genome = new DummyGenome,
		/**
		 * UserData содержит ссылку на экземпляр бота (класса Bot).
		 */
		public readonly body: Body = new Body
	) {
		this.friction = genome.readCode(0, [0, 1])
		this.density = genome.readCode(1, [10, 15])
		this.size = genome.readCode(2, [.4, .5])
		this.energy = new Energy(
			genome.readCode(3, [500, 5000]),
			genome.readCode(4, [1000, 5000])
		)

		if (body.getWorld()) {
			body.setUserData(this)

			const fixture = convertPlanckListToArray(this.body.getFixtureList())[0]
			if (fixture) {
				this.body.destroyFixture(fixture)
			}

			this.body.createFixture(
				createBotShape(this.size, this.genome),
				{
					density: this.density,
					friction: this.friction,
					userData: 'body'
				}
			)

			this.body.createFixture(
				//new Circle(new Vec2(1, 0), .11),
				new Box(1, 0.01, new Vec2(1, 0)),
				{
					isSensor: true,
					userData: new Sensor(type => {
						switch (type) {
							case SensorActivateType.Bot:
								this.genome.interrupt(0)
								break
							case SensorActivateType.Edge:
								this.genome.interrupt(1)
								break
						}
					})
				}
			)
		}
	}

	public isDead() {
		//return false
		return this.energy.value <= 0
	}

	public get shape(): Shape {
		const botBodyFixture = convertPlanckListToArray(this.body.getFixtureList()).find(fixture => fixture.getUserData() === 'body')

		if (!botBodyFixture) {
			throw new Error('Не найдено тело бота')
		}

		return botBodyFixture.getShape()
	}
}

function createBotShape(size: number, genome: Genome) {
	const moveCommands = genome.sequence.filter(item => item === 0).length
	const stopCommands = genome.sequence.filter(item => item === 3).length
	const attackCommands = genome.sequence.filter(item => item === 4).length
	const fleeCommands = genome.sequence.filter(item => item === 5).length

	const type: 'circle' | 'box' = (
		moveCommands + attackCommands > stopCommands + fleeCommands
			? 'circle'
			: 'box'
	)

	let botShape: Shape
	switch (type) {
		case 'circle':
			botShape = createCircleShape(size)
			break
		case 'box':
			botShape = createBoxShape(size)
			break
	}
	return botShape
}

function createCircleShape(size: number) {
	return new Circle(size)
}

function createBoxShape(size: number) {
	return new Box(size, size)
}

interface IDamping {
	angularDamping?: number
	linearDamping?: number
}

export function createBotBody(world: World, position: Vec2, damping: IDamping = {}): Body {
	return world.createBody({
		type: 'dynamic',
		angle: toRadian(getRandomInt(0, 360)),
		position,
		...damping
	})
}