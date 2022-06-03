import {IData} from '../interfaces/IData'

export class DataReplacingMessage {
	public constructor(
		public readonly previousData: IData,
		public readonly data: IData
	) {}
}