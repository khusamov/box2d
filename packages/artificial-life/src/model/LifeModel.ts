import {Edge, Vec2, World} from 'planck'
import {getRandomInt} from '../functions/getRandomInt'
import {Bot, createBotBody} from './Bot'
import {BotVirtualMachine} from './BotVirtualMachine'
import {EasyGenome} from './EasyGenome'
import {defaultLifeModelParameters, ILifeModelParameters} from './interfaces/ILifeModelParameters'
import {Sensor} from './Sensor'
import {FrequencyDistributionSequence} from './Sequence'

const velocityIterations = 6
const positionIterations = 2

/**
 * Модель искусственной жизни ботов.
 */
export class LifeModel {
	public readonly bots: Bot[] = []
	public readonly world: World

	public constructor(
		private readonly botVirtualMachine: BotVirtualMachine,
		parameters: ILifeModelParameters = {}
	) {
		this.world = new World({
			...defaultLifeModelParameters.world,
			...parameters.world,
			blockSolve: true
		})

		// Создание чашки Петри (ограничительной области для ботов).
		const width = parameters.petriDish?.width || defaultLifeModelParameters.petriDish?.width || 0
		const height = parameters.petriDish?.height || defaultLifeModelParameters.petriDish?.height || 0
		createPetriDishEdge(width, height, this.world)

		// Создание ботов.
		Array(parameters.bots?.count || defaultLifeModelParameters.bots?.count).fill(null).forEach(() => {
			this.bots.push(
				new Bot(
					new EasyGenome(new FrequencyDistributionSequence(
						parameters.bot?.genome?.length || defaultLifeModelParameters.bot?.genome?.length || 0,
						this.botVirtualMachine.commandProvider.frequencyDistribution)
					),
					createBotBody(this.world, getBotRandomPosition(parameters))
				)
			)
		})

		this.world.on('begin-contact', contact => {
			if (contact.getFixtureA().isSensor() || contact.getFixtureB().isSensor()) {
				// Сработал датчик.
				const sensorFixture = [contact.getFixtureA(), contact.getFixtureB()].find(fixture => fixture.isSensor())
				const targetFixture = [contact.getFixtureA(), contact.getFixtureB()].find(fixture => !fixture.isSensor())
				if (sensorFixture && targetFixture) {
					const data = sensorFixture.getUserData()
					if (data instanceof Sensor) {
						data.activate(targetFixture)
					}
				}
			} else {
				// Столкновение двух ботов.
			}
		})

		// const sequence = this.bots
		// 	.map(bot => Array.from(bot.genome.sequence) as number[])
		// 	.reduce((result, sequence) => result.concat(sequence), [])
		// const frequency: number[] = Array(Math.max(...sequence) + 1).fill(0)
		// sequence.forEach(item => frequency[item]++)
		// console.log(frequency)
	}

	public update(timeInterval: number) {
		this.world.step(timeInterval, velocityIterations, positionIterations)
		this.botVirtualMachine.update(timeInterval, this.bots)
	}
}

function getBotRandomPosition(parameters: ILifeModelParameters) {
	const padding = 1
	const width = parameters.petriDish?.width || defaultLifeModelParameters.petriDish?.width || 0
	const height = parameters.petriDish?.height || defaultLifeModelParameters.petriDish?.height || 0
	return new Vec2(
		getRandomInt(padding, width / 2 - padding),
		getRandomInt(-height / 2 + padding, height / 2 - padding)
	)
}

function createPetriDishEdge(width: number, height: number, world: World) {
	const extremeX = width / 2
	const extremeY = height / 2

	const edge: Array<[number, number, number, number]> = [
		[-extremeX, +extremeY, +extremeX, +extremeY],
		[-extremeX, -extremeY, -extremeX, +extremeY],
		[+extremeX, -extremeY, +extremeX, +extremeY],
		[-extremeX, -extremeY, +extremeX, -extremeY],
	]

	const worldEdgeBody = world.createBody({
		type: 'static'
	})
	worldEdgeBody.setUserData('edge')
	edge.forEach(edge => {
		worldEdgeBody.createFixture(
			new Edge(
				new Vec2(edge[0], edge[1]),
				new Vec2(edge[2], edge[3])
			),
			{
				friction: 1
			}
		)
	})

	// Стенка по середине.
	worldEdgeBody.createFixture(
		new Edge(
			new Vec2(0, height / 2),
			new Vec2(0, -height / 2 + 1)
		)
	)
}