import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {DataStorageFasade, EntityAfterAddingMessage, isData} from 'anubis-data-storage'
import {Body, Shape} from 'planck'
import {FixtureData} from '../data/FixtureData'
import {RigidbodyData} from '../data/RigidbodyData'
import {RigidbodyCreationMessage} from '../messages/RigidbodyCreationMessage'
import {ShapeData} from '../data/shape/ShapeData'
import {FixtureCreationMessage} from '../messages/FixtureCreationMessage'
import {ShapeCreationMessage} from '../messages/ShapeCreationMessage'

/**
 * Правило создания креплений форм к твердому телу.
 * @event FixtureCreationMessage
 */
export class FixtureCreationRule extends Rule {
	public init(): void {
		this.messageEmitter.on(EntityAfterAddingMessage, async ({entity}) => {
			const fixtureDataList = entity.flat(Infinity).filter(isData(FixtureData))

			for (const fixtureData of fixtureDataList) {
				if (fixtureData.fixture) {
					throw new Error('Нельзя добавлять данные FixtureData с предопределеным fixture')
				}
			}

			await Promise.all(
				fixtureDataList.map(
					fixtureDataOrder => this.createFixture(fixtureDataOrder)
				)
			)
		})
	}

	private async createFixture(fixtureDataOrder: FixtureData) {
		return new Promise(resolve => {
			this.messageEmitter.once(UpdateMessage, async ({dataStorage}) => {
				const dataStorageFasade = new DataStorageFasade(dataStorage)
				const body = await this.getBody(fixtureDataOrder)
				const shape = await this.getShape(fixtureDataOrder)
				const fixtureData = (
					new FixtureData(
						fixtureDataOrder.fixtureDef,
						body.createFixture(shape, fixtureDataOrder.fixtureDef)
					)
				)
				dataStorageFasade.createDataFasade(fixtureDataOrder).replace(fixtureData)
				this.messageEmitter.emit(new FixtureCreationMessage(fixtureData))
				resolve(null)
			})
		})
	}

	private getShapeData(fixtureData: FixtureData): Promise<ShapeData> {
		return new Promise<ShapeData>(resolve => {
			this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
				const entity = new DataStorageFasade(dataStorage).createDataFasade(fixtureData).entity
				const shapeData = entity.find(isData(ShapeData))
				if (!shapeData) {
					throw new Error('Не найдена форма для создания крепления')
				}
				resolve(shapeData)
			})
		})
	}

	private getRigidbodyData(fixtureData: FixtureData): Promise<RigidbodyData> {
		return new Promise<RigidbodyData>(resolve => {
			this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
				const dataStorageFasade = new DataStorageFasade(dataStorage)
				const entity = dataStorageFasade.createDataFasade(fixtureData).entity
				let rigidbodyData = entity.find(isData(RigidbodyData))
				if (!rigidbodyData) {
					rigidbodyData = (
						dataStorageFasade.createEntityFasade(entity)
							.parentEntity
							.find(isData(RigidbodyData)) as RigidbodyData
					)
				}
				if (!rigidbodyData) {
					throw new Error('Не найдено твердое тело для создания крепления')
				}
				resolve(rigidbodyData)
			})
		})
	}

	private async getBody(fixtureData: FixtureData): Promise<Body> {
		return new Promise<Body>(resolve => {
			this.messageEmitter.once(UpdateMessage, async ({dataStorage}) => {
				const rigidbodyData = await this.getRigidbodyData(fixtureData)
				if (rigidbodyData.body) {
					resolve(rigidbodyData.body)
				} else {
					const dataStorageFasade = new DataStorageFasade(dataStorage)
					const entity = dataStorageFasade.createDataFasade(rigidbodyData).entity
					this.messageEmitter.on(RigidbodyCreationMessage, ({rigidbodyData, body}, {dispose}) => {
						if (dataStorageFasade.createDataFasade(rigidbodyData).entity === entity) {
							resolve(body)
							dispose()
						}
					})
				}
			})
		})
	}

	private async getShape(fixtureData: FixtureData): Promise<Shape> {
		return new Promise<Shape>(resolve => {
			this.messageEmitter.once(UpdateMessage, async ({dataStorage}) => {
				const shapeData = await this.getShapeData(fixtureData)
				if (shapeData.shape) {
					resolve(shapeData.shape)
				} else {
					const dataStorageFasade = new DataStorageFasade(dataStorage)
					const entity = dataStorageFasade.createDataFasade(shapeData).entity
					this.messageEmitter.on(ShapeCreationMessage, ({shapeData, shape}, {dispose}) => {
						if (dataStorageFasade.createDataFasade(shapeData).entity === entity) {
							resolve(shape)
							dispose()
						}
					})
				}
			})
		})
	}
}