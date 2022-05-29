import {IRule} from '../base/interfaces/IRule';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {isData} from '../base/interfaces/IData';
import {Rigidbody} from '../data/Rigidbody';
import {Shape} from '../data/Shape';
import {Fixture} from '../data/Fixture';
import {hasData} from '../base/Entity';

export class FixtureCreatorRule implements IRule {
	private game: IGameEnvironment | undefined

	init(game: IGameEnvironment) {
		this.game = game
	}

	update(_timeInterval: number) {
		if (this.game) {
			const {entityList} = this.game

			const withoutFixtureEntityList = (
				entityList.filter(hasData(Rigidbody, Fixture)).filter(entity => {
					const shapeData = entity.find((data): data is Shape => data instanceof Shape)
					const fixtureData = entity.find(isData(Fixture))
					return shapeData && shapeData.shape && fixtureData && fixtureData.fixture === undefined
				})
			)

			for (const entity of withoutFixtureEntityList) {
				const rigidbodyData = entity.find(isData(Rigidbody))
				const shapeData = entity.find((data): data is Shape => data instanceof Shape)
				const fixtureData = entity.find(isData(Fixture))
				if (rigidbodyData && shapeData && shapeData.shape && fixtureData) {
					fixtureData.fixture = (
						rigidbodyData.body?.createFixture(
							shapeData.shape,
							fixtureData.parameters
						)
					)
				}
			}
		}
	}
}