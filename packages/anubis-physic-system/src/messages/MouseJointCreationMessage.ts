import {Message} from 'anubis-message-broker'
import {MouseJointData} from '../data/joint/MouseJointData'
import {MouseJoint} from 'planck'

export class MouseJointCreationMessage extends Message {
	public constructor(public mouseJointData: MouseJointData) {
		super()
	}

	public get mouseJoint(): MouseJoint {
		if (!this.mouseJointData.mouseJoint) {
			throw new Error('Соединение в этом сообщении должно быть уже определено')
		}

		return this.mouseJointData.mouseJoint
	}
}