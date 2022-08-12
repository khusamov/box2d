import {DataStorageFacade, EntityAfterAddingMessage, isData} from 'anubis-data-storage'
import {Rule} from 'anubis-rule-system'
import {Body, Shape} from 'planck'
import {FixtureData} from '../data/FixtureData'
import {RigidbodyData} from '../data/RigidbodyData'
import {ShapeData} from '../data/shape/ShapeData'
import {FixtureCreationMessage} from '../messages/FixtureCreationMessage'
import {RigidbodyCreationMessage} from '../messages/RigidbodyCreationMessage'
import {ShapeCreationMessage} from '../messages/ShapeCreationMessage'

/**
 * Правило создания креплений форм к твердому телу.
 * @event FixtureCreationMessage
 */
export class FixtureCreationRule extends Rule {
	public execute(): void {
		this.context.messageEmitter.on(EntityAfterAddingMessage, async ({entity}) => {
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

	private async createFixture(fixtureDataOrder: FixtureData): Promise<void> {
		const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
		const body = await this.getBody(fixtureDataOrder)
		const shape = await this.getShape(fixtureDataOrder)
		const fixtureData = (
			new FixtureData(
				fixtureDataOrder.fixtureDef,
				body.createFixture(shape, fixtureDataOrder.fixtureDef)
			)
		)
		dataStorageFacade.createDataFasade(fixtureDataOrder).replace(fixtureData)
		this.context.messageEmitter.emit(new FixtureCreationMessage(fixtureData))
	}

	private async getShape(fixtureData: FixtureData): Promise<Shape> {
		return new Promise<Shape>(resolve => {
			const shapeData = this.getShapeData(fixtureData)
			if (shapeData.shape) {
				resolve(shapeData.shape)
			} else {
				const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
				const entity = dataStorageFacade.createDataFasade(shapeData).entity
				this.context.messageEmitter.on(ShapeCreationMessage, ({shapeData, shape}, {dispose}) => {
					if (dataStorageFacade.createDataFasade(shapeData).entity === entity) {
						resolve(shape)
						dispose()
					}
				})
			}
		})
	}

	private async getBody(fixtureData: FixtureData): Promise<Body> {
		return new Promise<Body>(resolve => {
			const rigidbodyData = this.getRigidbodyData(fixtureData)
			if (rigidbodyData.body) {
				resolve(rigidbodyData.body)
			} else {
				const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
				const entity = dataStorageFacade.createDataFasade(rigidbodyData).entity
				this.context.messageEmitter.on(RigidbodyCreationMessage, ({rigidbodyData, body}, {dispose}) => {
					if (dataStorageFacade.createDataFasade(rigidbodyData).entity === entity) {
						dispose()
						resolve(body)
					}
				})
			}
		})
	}

	private getShapeData(fixtureData: FixtureData): ShapeData {
		const entity = new DataStorageFacade(this.context.dataStorage).createDataFasade(fixtureData).entity
		const shapeData = entity.find(isData(ShapeData))
		if (!shapeData) {
			throw new Error('Не найдена форма для создания крепления')
		}
		return shapeData
	}

	private getRigidbodyData(fixtureData: FixtureData): RigidbodyData {
		const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
		const entity = dataStorageFacade.createDataFasade(fixtureData).entity
		let rigidbodyData = entity.find(isData(RigidbodyData))
		if (!rigidbodyData) {
			rigidbodyData = (
				dataStorageFacade.createEntityFasade(entity)
					.parentEntity
					.find(isData(RigidbodyData)) as RigidbodyData | undefined
			)
		}
		if (!rigidbodyData) {
			throw new Error('Не найдено твердое тело для создания крепления')
		}
		return rigidbodyData
	}
}