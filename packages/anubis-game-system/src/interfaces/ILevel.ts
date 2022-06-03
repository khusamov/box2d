import {Rule} from '../classes/Rule'

export interface ILevel {
	readonly rules: Rule[]
	readonly messages?: Object[]
}