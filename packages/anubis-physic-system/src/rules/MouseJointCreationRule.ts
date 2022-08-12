import {DataStorageFacade} from 'anubis-data-storage/src'
import {Rule} from 'anubis-rule-system'
import {DataAfterAddingMessage, EntityAfterAddingMessage, isData} from 'anubis-data-storage'
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
    public execute(): void {
    	this.context.messageEmitter.on(DataAfterAddingMessage, async ({data}) => {
    		if (data instanceof MouseJointData) {
				await this.createAndAddMouseJoint(data)
			}
		})

        this.context.messageEmitter.on(EntityAfterAddingMessage, async ({entity}) => {
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

		const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
		const mouseJointData = (
			new MouseJointData(
				mouseJointDataOrder.mouseJointDef,
				mouseJoint
			)
		)
		dataStorageFacade.createDataFasade(mouseJointDataOrder).replace(mouseJointData)
		this.context.messageEmitter.emit(new MouseJointCreationMessage(mouseJointData))
	}

	private async findBodyB({findBodyB}: TPartialPicked<IJointFindBody, 'findBodyA'>): Promise<Body> {
		const bodyB = findBodyB(this.context.dataStorage)
		if (bodyB) {
			return bodyB
		} else {
			return new Promise<Body>(resolve => {
				this.context.messageEmitter.on(EntityAfterAddingMessage, async (_, {dispose}) => {
					const bodyB = findBodyB(this.context.dataStorage)
					if (bodyB) {
						resolve(bodyB)
						dispose()
					}
				})
			})
		}
	}

	private async getWorld(): Promise<World> {
		const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
		const world = dataStorageFacade.find(isData(PhysicWorldData))?.world
    	return new Promise<World>(resolve => {
			if (world) {
				resolve(world)
			} else {
				this.context.messageEmitter.once(
					PhysicWorldCreationMessage,
					({world}) => resolve(world)
				)
			}
		})
	}
}