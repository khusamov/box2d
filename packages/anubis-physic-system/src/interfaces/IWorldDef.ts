import {Vec2} from 'planck'

export interface IWorldDef {
	gravity?: Vec2;
	allowSleep?: boolean;
	warmStarting?: boolean;
	continuousPhysics?: boolean;
	subStepping?: boolean;
	blockSolve?: boolean;
	velocityIterations?: number;
	positionIterations?: number;
}