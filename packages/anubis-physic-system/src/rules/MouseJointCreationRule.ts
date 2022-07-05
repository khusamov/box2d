import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {DataAfterAddingMessage, DataStorageFasade, EntityAfterAddingMessage, IDataStorage, isData} from 'anubis-data-storage'
import {MouseJointData} from '../data/joint/MouseJointData'
import {Body, World, MouseJoint} from 'planck'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'
import {IJointFindBody} from '../interfaces/IJointFindBody'
import {MouseJointCreationMessage} from '../messages/MouseJointCreationMessage'
import {TPartialPicked} from '../types/TPartialPicked'

/**
 * @event MouseJointCreationMessage
 */
export class MouseJointCreationRule extends Rule {
    public init(): void {
    	this.messageEmitter.on(DataAfterAddingMessage, async ({data}) => {
    		if (data instanceof MouseJointData) {
				await this.createAndAddMouseJoint(data)
			}
		})

        this.messageEmitter.on(EntityAfterAddingMessage, async ({entity}) => {
        	const mouseJointDataList = entity.flat(Infinity).filter(isData(MouseJointData))

			for (const mouseJointData of mouseJointDataList) {
				if (mouseJointData.mouseJoint) {
					throw new Error('Нельзя добавлять данные MouseJointData с предопределеным mouseJoint')
				}
			}

			await Promise.all(
				mouseJointDataList.map(
					mouseJointDataOrder => this.createAndAddMouseJoint(mouseJointDataOrder)
				)
			)
		})
    }

    private async createAndAddMouseJoint(mouseJointDataOrder: MouseJointData) {
		const mouseJoint = await this.createMouseJoint(mouseJointDataOrder)
		await this.addMouseJoint(mouseJoint, mouseJointDataOrder)
	}

    private async createMouseJoint(mouseJointDataOrder: MouseJointData): Promise<MouseJoint | null> {
		const world = await this.getWorld()
		return world.createJoint(
			new MouseJoint({
				...mouseJointDataOrder.mouseJointDef,
				bodyA: world.createBody(),
				bodyB: await this.findBodyB(mouseJointDataOrder.mouseJointDef)
			})
		)
	}

	private async addMouseJoint(mouseJoint: MouseJoint | null, mouseJointDataOrder: MouseJointData): Promise<void> {
		if (!mouseJoint) {
			throw new Error('Соединение не создано')
		}

		const dataStorageFasade = new DataStorageFasade(await this.getDataStorage())
		const mouseJointData = (
			new MouseJointData(
				mouseJointDataOrder.mouseJointDef,
				mouseJoint
			)
		)
		dataStorageFasade.createDataFasade(mouseJointDataOrder).replace(mouseJointData)
		this.messageEmitter.emit(new MouseJointCreationMessage(mouseJointData))
	}

	private async findBodyB({findBodyB}: TPartialPicked<IJointFindBody, 'findBodyA'>): Promise<Body> {
		const bodyB = findBodyB(await this.getDataStorage())
		if (bodyB) {
			return bodyB
		} else {
			return new Promise<Body>(resolve => {
				this.messageEmitter.on(EntityAfterAddingMessage, async (_, {dispose}) => {
					const bodyB = findBodyB(await this.getDataStorage())
					if (bodyB) {
						resolve(bodyB)
						dispose()
					}
				})
			})
		}
	}

	private async getWorld(): Promise<World> {
		const dataStorageFasade = new DataStorageFasade(await this.getDataStorage())
		const world = dataStorageFasade.find(isData(PhysicWorldData))?.world
    	return new Promise<World>(resolve => {
			if (world) {
				resolve(world)
			} else {
				this.messageEmitter.once(
					PhysicWorldCreationMessage,
					({world}) => resolve(world)
				)
			}
		})
	}

	private async getDataStorage(): Promise<IDataStorage> {
    	return new Promise<IDataStorage>(resolve => {
			this.messageEmitter.once(
				UpdateMessage,
				({dataStorage}) => resolve(dataStorage)
			)
		})
	}
}