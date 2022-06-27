import {Data} from 'anubis-data-storage'

export enum BallStateType {
	Moving,
	Stopped
}

export class BallStateData extends Data {
	public constructor(
		public state: BallStateType = BallStateType.Stopped
	) {
		super()
	}

	public clone() {
		return new BallStateData(this.state)
	}
}