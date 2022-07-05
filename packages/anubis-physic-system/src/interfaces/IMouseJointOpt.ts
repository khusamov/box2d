export interface IMouseJointOpt {
	/**
	 * [maxForce = 0.0] The maximum constraint force that can be exerted to move
	 * the candidate body. Usually you will express as some multiple of the
	 * weight (multiplier * mass * gravity).
	 */
	maxForce?: number;
	/**
	 * [frequencyHz = 5.0] The response speed.
	 */
	frequencyHz?: number;
	/**
	 * [dampingRatio = 0.7] The damping ratio. 0 = no damping, 1 = critical
	 * damping.
	 */
	dampingRatio?: number;
}