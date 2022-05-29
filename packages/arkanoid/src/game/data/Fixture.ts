import {IData} from '../base/interfaces/IData';
import {Fixture as PlanckFixture} from 'planck'

export class Fixture implements IData {
	public fixture: PlanckFixture | undefined

	public get parameters(): Readonly<FixtureOpt> {
		return this._parameters
	}

	public constructor(private _parameters: FixtureOpt = {}) {}

	public clone() {
		return new Fixture(this._parameters)
	}
}

interface FixtureOpt {
	userData?: unknown;
	/**
	 * The friction coefficient, usually in the range [0,1]
	 */
	friction?: number;
	/**
	 * The restitution (elasticity) usually in the range [0,1]
	 */
	restitution?: number;
	/**
	 * The density, usually in kg/m^2
	 */
	density?: number;
	/**
	 * A sensor shape collects contact information but never generates a collision response.
	 */
	isSensor?: boolean;
	/**
	 * Zero, positive or negative collision group.
	 * Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.
	 */
	filterGroupIndex?: number;
	/**
	 * Collision category bit or bits that this fixture belongs to.
	 * If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.
	 */
	filterCategoryBits?: number;
	/**
	 * Collision category bit or bits that this fixture accept for collision.
	 */
	filterMaskBits?: number;
}