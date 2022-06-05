import {isData, Rule} from "anubis-game-system";
import {UpdateMessage} from "../../game/messages/UpdateMessage";
import {PhysicWorldData} from '../data/PhysicWorldData'

export class PhysicWorldUpdateRule extends Rule {
	public execute(): void {
		this.subscribe.on(UpdateMessage, ({timeInterval}) => {
			this.data.find(isData(PhysicWorldData))?.world?.step(timeInterval)
		})
	}
}