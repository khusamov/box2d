import {Entity} from './Entity'

/**
 * Ключ привязки игровой сущности к ее данным.
 * У экземпляра данных создается свойство со ссылкой на игровую сущность.
 */
export const EntitySymbol = Symbol.for(Entity.name)