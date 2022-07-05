import {Vec2} from 'planck'
import {IJointDef} from './IJointDef'
import {IMouseJointOpt} from './IMouseJointOpt'

export interface IMouseJointDef extends IJointDef, IMouseJointOpt {
	/**
	 * The initial world target point. This is assumed to coincide with the body
	 * anchor initially.
	 */
	target: Vec2;
}