import {MacroRule} from './rule/MacroRule'
import {IFeature} from '../interfaces/IFeature'

/**
 * Группа правил, объединенных в одну фичу.
 */
export class Feature extends MacroRule implements IFeature {}