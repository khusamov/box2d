import {Edge, Vec2, World} from 'planck'
import {convertPlanckListToArray} from '../functions/convertPlanckListToArray'
import {getRandomInt} from '../functions/getRandomInt'
import {Bot, createBotBody} from './Bot'
import {BotVirtualMachine} from './BotVirtualMachine'
import {EasyGenome} from './EasyGenome'
import {AttackCommand} from './commands/AttackCommand'
import {CommandProvider} from './commands/CommandProvider'
import {FleeCommand} from './commands/FleeCommand'
import {LookCommand} from './commands/LookCommand'
import {MoveCommand} from './commands/MoveCommand'
import {RotateCommand} from './commands/RotateCommand'
import {StopCommand} from './commands/StopCommand'
import {Sequence} from './Sequence'

// TODO Модуль createPlanckWorld() УДАЛИТЬ!
// TODO И почистить Sequence.

const velocityIterations = 6
const positionIterations = 2

const bots: Bot[] = []

/**
 * Чашка Петри. Ограничивает движение ботов.
 */
const petriDish = {
	width: 70,
	height: 40
}

const botNumber = 20

const vm = new BotVirtualMachine(
	new CommandProvider(
		/**
		 * Карта соответствия кодов (индекс) генома и команд.
		 */
		{command: new MoveCommand, frequency: 100},
		{command: new LookCommand, frequency: 50},
		{command: new RotateCommand, frequency: 100},
		{command: new StopCommand, frequency: 20},
		{command: new AttackCommand, frequency: 20},
		{command: new FleeCommand, frequency: 100},
	)
)

/**
 * @deprecated
 */
export function update(world: World, timeInterval: number) {
	world.step(timeInterval, velocityIterations, positionIterations)

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

	vm.update(timeInterval, bots)
}

/**
 * @deprecated
 */
export function createPlanckWorld() {
	const world = new World({
		gravity: new Vec2(0, 0),
		blockSolve: true
	})

	createPetriDishEdge(world)

	Array(botNumber).fill(null).map(() => {
		const botSize = 1
		const position = new Vec2(
			getRandomInt(botSize, petriDish.width / 2 - botSize),
			getRandomInt(-petriDish.height / 2 + botSize, petriDish.height / 2 - botSize)
		)
		const genome = new EasyGenome(
			Sequence.createRandom(
				50,
				vm.commandProvider.length,
				() => {
					const commandDistribution: number[] = []
					for (const info of vm.commandProvider) {
						commandDistribution.push(
							...Array(info.frequency).fill(vm.commandProvider.indexOf(info))
						)
					}
					return commandDistribution[getRandomInt(0, commandDistribution.length - 1)] as number
				}
			),
		)
		const bot = new Bot(genome, createBotBody(world, position))
		bots.push(bot)
	})

	return world
}

/**
 * @deprecated
 */
function createPetriDishEdge(world: World) {
	const extremeX = petriDish.width / 2
	const extremeY = petriDish.height / 2

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
			)
		)
	})

	// Стенка по середине.
	worldEdgeBody.createFixture(
		new Edge(
			new Vec2(0, petriDish.height / 2),
			new Vec2(0, -petriDish.height / 2 + 1)
		)
	)
}