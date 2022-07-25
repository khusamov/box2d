import {ICommand} from 'base-types'
import {MessageBrokerCreator} from 'anubis-message-broker'
import {DataStorageFacade} from './classes/DataStorageFacade'
import {DataStorage} from './classes/DataStorage'
import {Entity} from './classes/entity/Entity'
import {Data} from './classes/data/Data'
import {isData} from './functions/isData'

// Настройка брокера сообщений. Пример взят из anubis-message-broker.
const commandQueue: ICommand[] = []
const messageBroker = new MessageBrokerCreator(commandQueue).create()
messageBroker.start()

// Настройка хранилища игровых сущностей и данных.
const dataStorage = new DataStorage(messageBroker)
const dataStorageFacade = new DataStorageFacade(dataStorage)

// Сущность и ее вложенные сущности и данные можно создавать отдельно. При этом сообщений о создании данных генерироваться не будут.
const monsterEntity = new Entity
monsterEntity.push(new Data, new Data, new Entity)

// Далее сущность с ее данными можно добавить в хранилище. В этот момент и будут сгенерированы сообщения о создании данных.
dataStorageFacade.addEntity(monsterEntity)

// Сущность можно в любой момент удалить из хранилища. Сообщения об удалении данных будут сгенерированы автоматически.
dataStorageFacade.deleteEntity(monsterEntity)

// В любой момент можно добавлять или удалять данные. Соответствующие сообщения будут сгенерированы автоматически.
class PositionData extends Data {}
const monsterEntityFasade = dataStorageFacade.createEntityFasade(monsterEntity)
monsterEntityFasade.addData(new PositionData)
monsterEntityFasade.deleteData(new PositionData)
monsterEntityFasade.replaceData(new PositionData, new Data)

// Поиск данных в хранилище.
const positionData = dataStorageFacade.find(isData(PositionData))
if (positionData) {
	// Работа с данными напрямую.
	const positionDataFasade = dataStorageFacade.createDataFasade(positionData)
	positionDataFasade.entity
	positionDataFasade.delete()
	positionDataFasade.replace(new Data)
}

// Поиск сущности.

class IdentificationData extends Data {
	type: string = ''
}

const monsterEntity2 = (
	dataStorageFacade
		.createEntityCollection(IdentificationData)
		.find(({type}) => type === 'Monster')
)
if (monsterEntity2) {

}