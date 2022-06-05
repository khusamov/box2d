import {DataAddingMessage, DataFasade, IEntity, isData, Rule} from 'anubis-game-system'
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
	public execute(): void {
		this.subscribe.on(DataAddingMessage, ({data}) => {
			if (data instanceof FixtureData) {
				const fixtureData = data

				if (fixtureData.fixture) {
					throw new Error('Нельзя добавлять данные с определенным fixture')
				}

				const entity = new DataFasade(fixtureData).entity

				if (entity) {
					const {shape, body} = this.createFixture(entity)

					if (!shape) {
						this.subscribe.on(ShapeCreationMessage, ({shapeData}) => {
							if (new DataFasade(shapeData).entity === entity) {
								this.createFixture(entity)
							}
						})
					}

					if (!body) {
						this.subscribe.on(RigidbodyCreationMessage, ({rigidbodyData}) => {
							if (new DataFasade(rigidbodyData).entity === entity) {
								this.createFixture(entity)
							}
						})
					}
				}
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
			const nextFixtureData = fixtureData.clone()
			nextFixtureData.fixture = body.createFixture(shape, fixtureData.fixtureDef)
			new DataFasade(fixtureData).replace(nextFixtureData)
			this.emitter.emit(new FixtureCreationMessage(nextFixtureData))
		}

		return {shape, body}
	}
}