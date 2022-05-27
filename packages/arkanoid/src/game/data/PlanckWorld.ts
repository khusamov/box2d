import {World} from 'planck';
import {IData} from '../base/interfaces/IData';

/**
 * Внимание, сущность с этими данными не обязательно создавать. Правило PlanckWorldRule создаст его автоматически.
 */
export class PlanckWorld implements IData {
	public world: World | undefined

	clone() {
		return new PlanckWorld
	}
}