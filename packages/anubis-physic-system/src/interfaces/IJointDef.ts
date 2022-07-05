import {Body} from 'planck'
import {IJointOpt} from './IJointOpt'

export interface IJointDef extends IJointOpt {
	/**
	 * The first attached body.
	 */
	bodyA?: Body;
	/**
	 * The second attached body.
	 */
	bodyB?: Body;
}