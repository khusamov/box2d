import {Message} from 'anubis-game-system'
import {RigidbodyData} from '../data/RigidbodyData'
import {Body} from "planck";

export class RigidbodyCreationMessage extends Message {
	public constructor(public rigidbodyData: RigidbodyData) {
		super()
	}

	public get body(): Body {
		if (!this.rigidbodyData.body) {
			throw new Error('Тело в этом сообщении должен быть уже определен')
		}

		return this.rigidbodyData.body
	}
}