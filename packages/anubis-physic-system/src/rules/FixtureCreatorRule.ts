import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system-2'
import {DataAddingMessage, DataStorageFasade, IEntity, isData} from 'anubis-data-storage'
import {ShapeCreationMessage} from "../messages/ShapeCreationMessage";
import {FixtureData} from "../data/FixtureData";
import {ShapeData} from "../data/ShapeData";
import {RigidbodyData} from "../data/RigidbodyData";
import {RigidbodyCreationMessage} from "../messages/RigidbodyCreationMessage";
import {FixtureCreationMessage} from '../messages/FixtureCreationMessage'

/**
 * @event FixtureCreationMessage
 */
export class FixtureCreatorRule extends Rule {
	public init(): void {
		this.messageEmitter.on(DataAddingMessage, ({data}) => {
			if (data instanceof FixtureData) {
				const fixtureData = data

				if (fixtureData.fixture) {
					throw new Error('Нельзя добавлять данные с определенным fixture')
				}

				this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
					const dataStorageFasade = new DataStorageFasade(dataStorage)
					const entity = dataStorageFasade.createDataFasade(fixtureData).entity

					if (entity) {
						const {shape, body} = this.createFixture(entity)

						if (!shape) {
							this.messageBroker.on(ShapeCreationMessage, ({shapeData}, {dispose}) => {
								if (dataStorageFasade.createDataFasade(shapeData).entity === entity) {
									this.createFixture(entity)
									dispose()
								}
							})
						}

						if (!body) {
							this.messageEmitter.on(RigidbodyCreationMessage, ({rigidbodyData}, {dispose}) => {
								if (dataStorageFasade.createDataFasade(rigidbodyData).entity === entity) {
									this.createFixture(entity)
									dispose()
								}
							})
						}
					}
				})
			}
		})
	}

	private createFixture(entity: IEntity) {
		const fixtureData = entity.find(isData(FixtureData))

		if (!fixtureData || fixtureData.fixture) {
			throw new Error('Не определены данные о креплении или определено крепление')
		}

		const shapeData = entity.find(isData(ShapeData))
		const rigidbodyData = entity.find(isData(RigidbodyData))
		const shape = shapeData?.shape
		const body = rigidbodyData?.body

		if (shape && body) {
			this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
				const nextFixtureData = fixtureData.clone()
				nextFixtureData.fixture = body.createFixture(shape, fixtureData.fixtureDef)
				new DataStorageFasade(dataStorage).createDataFasade(fixtureData).replace(nextFixtureData)
				this.messageEmitter.emit(new FixtureCreationMessage(nextFixtureData))
			})
		}

		return {shape, body}
	}
}