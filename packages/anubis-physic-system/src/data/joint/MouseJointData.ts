import {Data} from 'anubis-data-storage'
import {MouseJoint} from 'planck'
import {IMouseJointDef} from '../../interfaces/IMouseJointDef'
import {IJointFindBody} from '../../interfaces/IJointFindBody'
import {externalDataSymbol, IExternalData} from 'anubis-deletion-system'

/**
 * @link https://github.com/shakiba/planck.js/wiki/Joint#mouse-joint
 */
export class MouseJointData extends Data implements IExternalData {
	public readonly [externalDataSymbol] = true

	public constructor(
		public readonly mouseJointDef: IMouseJointDef & IJointFindBody,
		public readonly mouseJoint?: MouseJoint
	) {
		super()
	}
}