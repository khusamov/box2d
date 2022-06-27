import {Data} from 'anubis-data-storage'

interface IIdentification {
	id?: number
	name?: string
	type?: string
}

export const byId = (foundId: number) => ({id}: IdentificationData) => id === foundId
export const byType = (foundType: string) => ({type}: IdentificationData) => type === foundType
export const byName = (foundName: string) => ({name}: IdentificationData) => name === foundName

export class IdentificationData extends Data {
	public get id() {return this.identification.id}
	public get name() {return this.identification.name}
	public get type() {return this.identification.type}

	constructor(private identification: IIdentification) {
		super()
	}
}