import {Rule} from '../../anubis-game-system/classes/Rule'
import {EntityCreatedMessage} from '../messages/EntityCreatedMessage'

export abstract class AbstractShapeCreatorRule extends Rule {
	public constructor() {
		super()
	}

	public execute() {
		this.on(EntityCreatedMessage, ({entity}) => {

		})
	}
}