export type DataConstructor<D extends IData> = new(...params: any[]) => D
export const isData = <D extends IData>(DataClass: DataConstructor<D>) => (data: IData): data is D => data instanceof DataClass

/**
 * Данные игровой сущности.
 */
export interface IData {
	clone(): IData
}