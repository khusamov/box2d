import {Fixture} from 'planck'
import {Data} from 'anubis-data-storage'
import {IFixtureOpt} from '../interfaces/IFixtureOpt'

export class FixtureData extends Data {
	public constructor(
		public fixtureDef?: IFixtureOpt,
		public fixture?: Fixture
	) {
		super()
	}

	public clone<C extends this>(): C {
		return new FixtureData(this.fixtureDef) as C
	}
}