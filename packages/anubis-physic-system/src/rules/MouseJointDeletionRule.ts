import {DataStorageFacade, IEntity, isData} from 'anubis-data-storage'
import {DeletionRule} from 'anubis-deletion-system'
import {MouseJointData} from '../data/joint/MouseJointData'
import {PhysicWorldData} from '../data/PhysicWorldData'

// TODO Добавить удаление MouseJointData.

export class MouseJointDeletionRule extends DeletionRule {
	protected deletion(deletedEntity: IEntity) {
		const mouseJoint = deletedEntity.find(isData(MouseJointData))?.mouseJoint
		const world = new DataStorageFacade(this.context.dataStorage).find(isData(PhysicWorldData))?.world
		if (mouseJoint && world) {
			world.destroyJoint(mouseJoint)
		}
	}
}