import {ILevel} from '../../interfaces/ILevel'
import {MacroRule} from './MacroRule'

/**
 * Группа правил и сообщений для создания одного уровня игры.
 */
export abstract class Level extends MacroRule implements ILevel {}