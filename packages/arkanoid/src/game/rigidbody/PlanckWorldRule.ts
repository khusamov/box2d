import {IRule} from '../base/interfaces/IRule';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {PlanckWorld} from './PlanckWorld';
import {Vec2, World} from 'planck';
import {Entity} from '../base/Entity';

export class PlanckWorldRule implements IRule {
	private game: IGameEnvironment | undefined

	constructor(
		private gravity = new Vec2(0, -10)
	) {}

	init(game: IGameEnvironment): void {
		this.game = game

		let planckWorldEntity = game.entityList.find(entity => entity.hasData(PlanckWorld))

		if (!planckWorldEntity) {
			planckWorldEntity = new Entity('PlanckWorld', [new PlanckWorld])
			game.entityList.push(planckWorldEntity)
		}

		const planckWorld = planckWorldEntity.getData(PlanckWorld)
		if (!planckWorld.world) {
			planckWorld.world = new World({
				gravity: this.gravity,
				blockSolve: true
			})
		}
	}

	update(timeInterval: number) {
		if (this.game) {
			const planckWorldData = (
				this.game.entityList
					.find(entity => entity.hasData(PlanckWorld))
					?.getData(PlanckWorld)
			)
			if (planckWorldData) {
				planckWorldData.world?.step(timeInterval)
			}
		}
	}
}