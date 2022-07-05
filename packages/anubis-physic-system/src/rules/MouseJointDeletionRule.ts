import {DeletionRule} from 'anubis-deletion-system'
import {DataStorage, DataStorageFasade, IEntity, isData} from 'anubis-data-storage'
import {MouseJointData} from '../data/joint/MouseJointData'
import {PhysicWorldData} from '../data/PhysicWorldData'

// TODO Добавить удаление MouseJointData.

export class MouseJointDeletionRule extends DeletionRule {
	protected deletion(deletedEntity: IEntity, dataStorage: DataStorage) {
		const mouseJoint = deletedEntity.find(isData(MouseJointData))?.mouseJoint
		const world = new DataStorageFasade(dataStorage).find(isData(PhysicWorldData))?.world
		if (mouseJoint && world) {
			world.destroyJoint(mouseJoint)
		}
	}
}