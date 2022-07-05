import {Feature} from 'anubis-rule-system'
import {IPhysicWorldFeatureParameters, PhysicWorldFeature} from './PhysicWorldFeature'
import {RigidbodyFeature} from './RigidbodyFeature'
import {JointFeature} from './JointFeature'

interface IPhysicFeatureParameters extends IPhysicWorldFeatureParameters {}

export class PhysicFeature extends Feature {
	public constructor(parameters: IPhysicFeatureParameters = {}) {
		super(
			new PhysicWorldFeature(parameters),
			new RigidbodyFeature,
			new JointFeature
		)
	}
}