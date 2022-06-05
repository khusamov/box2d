import {Vec2} from 'planck'

export type BodyType = "static" | "kinematic" | "dynamic";
export interface IBodyDef {
	/**
	 * Body types are static, kinematic, or dynamic. Note: if a dynamic
	 * body would have zero mass, the mass is set to one.
	 */
	type?: BodyType;
	/**
	 * The world position of the body. Avoid creating bodies at the
	 * origin since this can lead to many overlapping shapes.
	 */
	position?: Vec2;
	/**
	 * The world angle of the body in radians.
	 */
	angle?: number;
	/**
	 * The linear velocity of the body's origin in world co-ordinates.
	 */
	linearVelocity?: Vec2;
	angularVelocity?: number;
	/**
	 * Linear damping is use to reduce the linear velocity. The
	 * damping parameter can be larger than 1.0 but the damping effect becomes
	 * sensitive to the time step when the damping parameter is large.
	 */
	linearDamping?: number;
	/**
	 * Angular damping is use to reduce the angular velocity.
	 * The damping parameter can be larger than 1.0 but the damping effect
	 * becomes sensitive to the time step when the damping parameter is large.
	 */
	angularDamping?: number;
	/**
	 * Should this body be prevented from rotating? Useful for characters.
	 */
	fixedRotation?: boolean;
	/**
	 * Is this a fast moving body that should be prevented from
	 * tunneling through other moving bodies? Note that all bodies are
	 * prevented from tunneling through kinematic and static bodies. This
	 * setting is only considered on dynamic bodies. Warning: You should use
	 * this flag sparingly since it increases processing time.
	 */
	bullet?: boolean;
	gravityScale?: number;
	/**
	 * Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.
	 */
	allowSleep?: boolean;
	/**
	 * Is this body initially awake or sleeping?
	 */
	awake?: boolean;
	/**
	 * Does this body start out active?
	 */
	active?: boolean;
	userData?: any;
}