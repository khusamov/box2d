import {ILevel} from '../interfaces/ILevel'
import {MacroRule} from './rule/MacroRule'

/**
 * Группа правил, объединенных в уровень игры.
 */
export class Level extends MacroRule implements ILevel {}