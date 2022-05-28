import {IData} from './IData';

/**
 * Игровая сущность.
 * @link https://github.com/mzaks/EntitasCookBook/blob/master/chapters/1_ingredients/101_component.md
 */
export interface IEntity extends Array<IData> {
	clone(): IEntity
}