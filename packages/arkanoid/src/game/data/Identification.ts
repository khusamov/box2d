import {IData} from '../base/interfaces/IData';

interface IIdentification {
	id?: number
	name?: string
	type?: string
}

export class Identification implements IData {
	public get id() {return this.identification.id}
	public get name() {return this.identification.name}
	public get type() {return this.identification.type}

	public constructor(private identification: IIdentification) {}

	public clone() {
		return new Identification(this.identification)
	}
}