import {Feature} from 'anubis-rule-system'
import {IWorldDef} from '../interfaces/IWorldDef'
import {PhysicWorldCreationRule} from '../rules/PhysicWorldCreationRule'
import {PhysicWorldStartRule} from '../rules/PhysicWorldStartRule'
import {PhysicWorldUpdateRule} from '../rules/PhysicWorldUpdateRule'

export interface IPhysicWorldFeatureParameters {
	worldDef?: IWorldDef
}

export class PhysicWorldFeature extends Feature {
	public constructor({worldDef}: IPhysicWorldFeatureParameters = {}) {
		super(
			new PhysicWorldCreationRule,
			new PhysicWorldStartRule(worldDef),
			new PhysicWorldUpdateRule
		)
	}
}