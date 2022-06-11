import {Message} from 'anubis-message-broker'
import {ShapeData} from '../data/ShapeData'
import {Shape} from 'planck'

export class ShapeCreationMessage extends Message {
	public constructor(public shapeData: ShapeData) {
		super()
	}

	public get shape(): Shape {
		if (!this.shapeData.shape) {
			throw new Error('Форма в этом сообщении должна быть уже определена')
		}

		return this.shapeData.shape
	}
}