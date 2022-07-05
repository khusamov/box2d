export interface IJointOpt {
	/**
	 * Use this to attach application specific data to your joints.
	 */
	userData?: any;
	/**
	 * Set this flag to true if the attached bodies
	 * should collide.
	 */
	collideConnected?: boolean;
}