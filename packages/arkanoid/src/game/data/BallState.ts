import {IData} from '../base/interfaces/IData';

export enum BallStateType {
	Moving,
	Stopped
}

export class BallState implements IData {
	constructor(
		public state: BallStateType = BallStateType.Stopped
	) {}

	clone() {
		return new BallState(this.state)
	}
}