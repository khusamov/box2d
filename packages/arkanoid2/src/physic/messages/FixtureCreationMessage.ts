import {Message} from 'anubis-game-system'
import {Fixture} from 'planck'
import {FixtureData} from '../data/FixtureData'

export class FixtureCreationMessage extends Message {
	public constructor(public fixtureData: FixtureData) {
		super()
	}

	public get fixture(): Fixture {
		if (!this.fixtureData.fixture) {
			throw new Error('Крепление в этом сообщении должно быть уже определено')
		}

		return this.fixtureData.fixture
	}
}