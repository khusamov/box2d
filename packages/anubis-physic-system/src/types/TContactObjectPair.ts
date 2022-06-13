import {IData} from 'anubis-data-storage'
import {IContactObject} from '../interfaces/IContactObject'

export type TContactObjectPair<D extends IData> = [IContactObject<D>, IContactObject<D>]