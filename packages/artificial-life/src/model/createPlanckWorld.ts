import {Edge, Vec2, World} from 'planck'
import {convertPlanckListToArray} from '../functions/convertPlanckListToArray'
import {getRandomInt} from '../functions/getRandomInt'
import {Bot, createBotBody} from './Bot'
import {BotVirtualMachine} from './BotVirtualMachine'
import {EasyGenome} from './EasyGenome'

const bots: Bot[] = []

/**
 * Чашка Петри. Ограничивает движение ботов.
 */
const petriDish = {
	width: 70,
	height: 40
}

const velocityIterations = 6
const positionIterations = 2

const vm = new BotVirtualMachine

export function update(world: World, timeStep = 1 / 60) {
	world.step(timeStep, velocityIterations, positionIterations)

	// Destroy bodies.
	convertPlanckListToArray(world.getBodyList()).map(body => {
		const data = body.getUserData()
		if (data!== null && typeof data === 'object') {
			if ('destroy' in data) {
				const destroyData = data as {destroy: boolean}
				if (destroyData.destroy) {
					world.destroyBody(body)
				}
			}
		}
	})

	for (const bot of bots) vm.update(bot)
}

export function createPlanckWorld() {
	const world = new World({
		gravity: new Vec2(0, 0),
		blockSolve: true
	})

	createPetriDishEdge(world)

	const botNumber = 5
	Array(botNumber).fill(null).map(() => {
		const botSize = 1
		const position = new Vec2(
			getRandomInt(-petriDish.width / 2 + botSize, petriDish.width / 2 - botSize),
			getRandomInt(-petriDish.height / 2 + botSize, petriDish.height / 2 - botSize)
		)
		const genome = new EasyGenome
		const bot = new Bot(genome, createBotBody(world, position))
		bots.push(bot)
	})

	return world
}

function createPetriDishEdge(world: World) {
	const extremeX = petriDish.width / 2
	const extremeY = petriDish.height / 2

	const edge: Array<[number, number, number, number]> = [
		[-extremeX, +extremeY, +extremeX, +extremeY],
		[-extremeX, -extremeY, -extremeX, +extremeY],
		[+extremeX, -extremeY, +extremeX, +extremeY],
		[-extremeX, -extremeY, +extremeX, -extremeY],
	]

	const worldEdge = world.createBody({
		type: 'static'
	})
	worldEdge.setUserData('edge')
	edge.forEach(edge => {
		worldEdge.createFixture(
			new Edge(
				new Vec2(edge[0], edge[1]),
				new Vec2(edge[2], edge[3])
			)
		)
	})
}