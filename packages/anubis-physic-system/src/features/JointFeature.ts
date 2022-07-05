import {Feature} from 'anubis-rule-system'
import {MouseJointCreatorRule} from '../rules/MouseJointCreatorRule'

export class JointFeature extends Feature {
	public constructor() {
		super(
			new MouseJointCreatorRule
		)
	}
}