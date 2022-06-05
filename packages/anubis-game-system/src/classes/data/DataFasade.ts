import {resolve} from 'inversion-of-control'
import {IData} from '../../interfaces/IData'
import {EntitySymbol} from '../entity/EntitySymbol'
import {MessageEmitter} from '../message/MessageEmitter'
import {DataDeletingOperation} from './operation/DataDeletingOperation'
import {DataReplacingOperation} from './operation/DataReplacingOperation'
import {IEntity} from "../../interfaces/IEntity";

export class DataFasade<D extends IData> {
	public constructor(private data: D) {}

	private get dataReplacingOperation() {
		return !this.entity ? undefined : (
			new DataReplacingOperation(
				this.entity,
				resolve<IData[]>('EntityDataList'),
				resolve<MessageEmitter>('MessageEmitter')
			)
		)
	}

	private get dataDeletingOperation() {
		return !this.entity ? undefined : (
			new DataDeletingOperation(
				this.entity,
				resolve<IData[]>('EntityDataList'),
				resolve<MessageEmitter>('MessageEmitter')
			)
		)
	}

	public get entity(): IEntity | undefined {
		return this.data[EntitySymbol]
	}

	public delete() {
		if (this.dataDeletingOperation) {
			this.dataDeletingOperation.execute(this.data)
		}
	}

	public replace(data: D) {
		if (this.dataReplacingOperation) {
			this.dataReplacingOperation.execute(this.data, data)
		}
	}
}