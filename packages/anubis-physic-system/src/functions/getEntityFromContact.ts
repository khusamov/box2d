import {Contact} from 'planck'
import {IEntity} from 'anubis-data-storage'

export function getEntityFromContact(contact: Contact): [IEntity, IEntity] {
	const fixtureA = contact.getFixtureA()
	const fixtureB = contact.getFixtureB()
	const bodyA = fixtureA.getBody()
	const bodyB = fixtureB.getBody()
	const entityA = bodyA.getUserData() as IEntity
	const entityB = bodyB.getUserData() as IEntity
	return [entityA, entityB]
}