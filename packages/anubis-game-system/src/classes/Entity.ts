import {IEntity} from '../interfaces/IEntity'
import {IData} from '../interfaces/IData'

/**
 * Игровая сущность.
 */
export class Entity extends Array<IData> implements IEntity {}