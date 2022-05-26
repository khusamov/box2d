import {Data} from '../base/Data';
import {World} from 'planck';

/**
 * Внимание, сущность с этими данными не обязательно создавать. Правило PlanckWorldRule создаст его автоматически.
 */
export class PlanckWorld extends Data {
	public world: World | undefined
}