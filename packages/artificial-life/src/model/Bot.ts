import {Body, Box, Circle, Shape, Vec2, World} from 'planck'
import {convertPlanckListToArray} from '../functions/convertPlanckListToArray'
import {getRandomInt} from '../functions/getRandomInt'
import {map} from '../functions/map'
import {toRadian} from '../functions/toRadian'
import {DummyGenome} from './DummyGenome'
import {Genome} from './Genome'

export class Bot {
	public readonly density: number
	public size: number
	public energy: number

	public constructor(
		public readonly genome: Genome = new DummyGenome,
		/**
		 * UserData содержит ссылку на экземпляр бота (класса Bot).
		 */
		public readonly body: Body = new Body
	) {
		const codeMaximum = genome.sequence.length > 0 ? genome.sequence.maximum : 0

		this.density = map(genome.readCode(0), 0, codeMaximum, 10, 15)
		this.size = map(genome.readCode(1), 0, codeMaximum, .4, .5)
		this.energy = map(genome.readCode(2), 0, codeMaximum, 100, 1000)

		if (body.getWorld()) {
			body.setUserData(this)

			const fixture = convertPlanckListToArray(this.body.getFixtureList())[0]
			if (fixture) {
				this.body.destroyFixture(fixture)
			}

			this.body.createFixture(
				createBotShape(this.size, this.genome),
				this.density
			)
		}
	}
}

function createBotShape(size: number, genome: Genome) {
	const moveCommands = genome.sequence.filter(item => item === 0).length
	const stopCommands = genome.sequence.filter(item => item === 3).length
	const attackCommands = genome.sequence.filter(item => item === 4).length
	const fleeCommands = genome.sequence.filter(item => item === 5).length

	const type: 'circle' | 'box' = moveCommands + attackCommands > stopCommands + fleeCommands ? 'circle' : 'box'

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

export function createBotBody(world: World, position: Vec2): Body {
	return world.createBody({
		type: 'dynamic',
		angle: toRadian(getRandomInt(0, 360)),
		position
	})
}