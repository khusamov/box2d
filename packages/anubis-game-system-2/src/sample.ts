import {ICommand} from 'base-types'
import {MessageBrokerCreator} from 'anubis-message-broker'
import {DataStorage} from 'anubis-data-storage'
import {Game} from './classes/Game'
import {CommandTimer} from './classes/CommandTimer'
import {ILevel} from './interfaces/ILevel'

const commandQueue: ICommand[] = []
const messageBroker = new MessageBrokerCreator(commandQueue).create()
const dataStorage = new DataStorage(messageBroker)

const level: ILevel = {
	messageBroker,
	dispose(): void {},
	execute(): void {}
}

const game = new Game(
	new CommandTimer(commandQueue),
	messageBroker,
	dataStorage,
	level
)

game.init()
game.start()
game.update(0)
game.pause()
game.dispose()
