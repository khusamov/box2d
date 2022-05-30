import {IRule} from '../base/interfaces/IRule'
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment'
import {Identification} from '../data/Identification'
import {Entity, hasData} from '../base/Entity'
import {Deleted} from '../data/Deleted'
import {isData} from '../base/interfaces/IData'
import {PlanckWorld} from '../data/PlanckWorld'

const isObject = <O extends object>(data: unknown): data is O => {
	if (data === null || data === undefined) return false
	return typeof data === 'object'
}

const isIdentificationUserData = (data: unknown): data is {identification: Identification} => {
	if (!isObject<{identification: any}>(data)) return false
	return 'identification' in data && data.identification instanceof Identification
}

/**
 * Правило столкновения мячика и кирпичика.
 * Внимание, это правило должно стоять после PlanckWorldRule.
 */
export class BrickBallCollisionRule implements IRule {
	public init(game: IGameEnvironment): void {
		const planckWorldEntity = game.entityList.find(hasData(PlanckWorld))
		if (planckWorldEntity) {
			const world = planckWorldEntity.find(isData(PlanckWorld))?.world
			if (world) {
				world.on('begin-contact', contact => {
					const fixtureA = contact.getFixtureA()
					const fixtureB = contact.getFixtureB()
					const bodyA = fixtureA.getBody()
					const bodyB = fixtureB.getBody()
					const userDataA = bodyA.getUserData() as object
					const userDataB = bodyB.getUserData() as object
					if (isIdentificationUserData(userDataA) && isIdentificationUserData(userDataB)) {
						if (
							userDataA.identification.type === 'Ball' && userDataB.identification.type === 'Brick'
							|| userDataA.identification.type === 'Brick' && userDataB.identification.type === 'Ball'
						) {
							const brickUserData = [userDataA, userDataB].find(userData => userData.identification.type === 'Brick')
							if (brickUserData) {
								(brickUserData as unknown as {entity: Entity}).entity.push(new Deleted)
							}
						}
					}
				})
			}
		}
	}
}