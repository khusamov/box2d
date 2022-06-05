import {IData} from './IData'

/**
 * Игровая сущность.
 * Массив объектов IData.
 * Игровая сущность сама по себе тожее является IData (то есть хранится в общем массиве игровых данных).
 */
export interface IEntity extends Array<IData>, IData {}