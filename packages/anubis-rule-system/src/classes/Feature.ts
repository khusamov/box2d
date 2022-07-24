import {IFeature} from '../interfaces/IFeature'
import {MacroRule} from './rule/MacroRule'

/**
 * Группа правил, объединенных в одну фичу.
 */
export class Feature extends MacroRule implements IFeature {}