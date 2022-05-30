import {IRule} from '../base/interfaces/IRule';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {PlanckWorld} from '../data/PlanckWorld';
import {Vec2, World} from 'planck';
import {Entity, hasData} from '../base/Entity';
import {isData} from '../base/interfaces/IData';

export class PlanckWorldRule implements IRule {
	private game: IGameEnvironment | undefined

	public constructor(
		private gravity = new Vec2(0, 0)
	) {}

	public init(game: IGameEnvironment): void {
		this.game = game

		let planckWorldEntity = game.entityList.find(isData(PlanckWorld))

		if (!planckWorldEntity) {
			planckWorldEntity = new Entity(new PlanckWorld)
			game.entityList.push(planckWorldEntity)
		}

		const planckWorldData = planckWorldEntity.find(isData(PlanckWorld))
		if (planckWorldData && !planckWorldData.world) {
			planckWorldData.world = new World({
				gravity: this.gravity,
				blockSolve: true
			})
		}
	}

	public update(timeInterval: number) {
		if (this.game) {
			const planckWorldData = (
				this.game.entityList
					.find(hasData(PlanckWorld))
					?.find(isData(PlanckWorld))
			)
			if (planckWorldData) {
				planckWorldData.world?.step(timeInterval)
			}
		}
	}
}