import {IData} from '../interfaces/IData'

export type DataConstructor<D extends IData> = abstract new(...params: any[]) => D