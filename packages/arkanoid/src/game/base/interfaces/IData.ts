export type DataConstructor<D extends IData> = new(...params: any[]) => D
export const isData = <D extends IData>(DataClass: DataConstructor<D>) => (data: IData): data is D => data instanceof DataClass

// TODO Похоже данные должны быть не мутабельными. Чтобы изменить данные надо заменить весь блок на новый.

/**
 * Данные игровой сущности.
 */
export interface IData {
	clone(): IData
}