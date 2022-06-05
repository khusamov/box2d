import {PhysicWorldCreatorRule} from '../rules/PhysicWorldCreatorRule'

export class Level1 {
	orders = [{
		type: 'CreatePhysicWorldOrder'
	}]

	rules = [
		new PhysicWorldCreatorRule
	]
}