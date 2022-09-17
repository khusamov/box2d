import {Vec2} from 'planck'

export interface ILifeModelParameters {
	world?: {
		gravity?: Vec2
	},
	body?: {
		angularDamping?: number,
		linearDamping?: number
	},
	bots?: {
		count?: number
	},
	bot?: {
		genome?: {
			length?: number
		}
	},
	petriDish?: {
		width?: number
		height?: number
	}
}

export const defaultLifeModelParameters: ILifeModelParameters = {
	world: {
		gravity: new Vec2(0, 0)
	},
	body: {
		angularDamping: .9,
		linearDamping: .9
	},
	bots: {
		count: 30
	},
	bot: {
		genome: {
			length: 100
		}
	},
	petriDish: {
		width: 70,
		height: 40
	}
}