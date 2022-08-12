import {DataStorageFacade} from 'anubis-data-storage'
import {Rule} from 'anubis-rule-system'
import {BallEntity} from '../../../entities/BallEntity'

/**
 * Внимание, координаты мячика регулируются правилом BallPositionRule.
 */
export class BallStartRule extends Rule {
	protected execute(): void {
		new DataStorageFacade(this.context.dataStorage).addEntity(new BallEntity)
	}
}