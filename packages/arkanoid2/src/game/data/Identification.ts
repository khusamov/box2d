interface IIdentification {
	id?: number
	name?: string
	type?: string
}

export class Identification {
	public get id() {return this.identification.id}
	public get name() {return this.identification.name}
	public get type() {return this.identification.type}

	constructor(private identification: IIdentification) {}
}