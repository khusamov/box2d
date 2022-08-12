import {Level} from 'anubis-rule-system'
import {PhysicFeature} from 'anubis-physic-system'
import {BallPlayOutRule} from '../rules/BallPlayOutRule'
import {GameBoardStartRule} from '../rules/start/GameBoardStartRule'
import {BrickWallStartRule} from '../rules/start/BrickWallStartRule'
import {BatStartRule} from '../rules/start/BatStartRule'
import {BallPositionRule} from '../rules/BallPositionRule'
import {BatHardMovingRule} from '../rules/BatHardMovingRule'
import {StartGameRule} from '../rules/StartGameRule'
import {BrickBallCollisionRule} from '../rules/BrickBallCollisionRule'
import {GameScoreRule} from '../rules/GameScoreRule'
import {BallStartRule} from '../rules/start/BallStartRule'
import {EntityDeletionRule} from 'anubis-deletion-system'
import {BrickBallCollisionSoundRule} from '../rules/BrickBallCollisionSoundRule'
import {TrapezoidAndRectangleBatEntity} from '../../entities/TrapezoidAndRectangleBatEntity'
import {BatMouseJointMovingRule} from '../rules/BatMouseJointMovingRule'

export enum BatMovingType {
	Hard,
	MouseJoint
}

export interface IPilotLevelParameters {
	movingType: BatMovingType
}

const BatMovingRuleByType = {
	[BatMovingType.Hard]: BatHardMovingRule,
	[BatMovingType.MouseJoint]: BatMouseJointMovingRule
}

/**
 * Пилотный уровень арканоида.
 */
export class PilotLevel extends Level {
	public constructor({movingType}: IPilotLevelParameters) {
		const batEntity = new TrapezoidAndRectangleBatEntity(
			movingType === BatMovingType.MouseJoint
				? {bodyDef: {type: 'dynamic'}}
				: {}
		)
		super(
			new EntityDeletionRule,
			new PhysicFeature,

			new GameBoardStartRule,
			new BatStartRule(batEntity),
			new BallStartRule,
			new BrickWallStartRule,

			new BrickBallCollisionSoundRule,

			new StartGameRule,
			new GameScoreRule,
			new BallPositionRule,
			new BatMovingRuleByType[movingType],
			new BrickBallCollisionRule,
			new BallPlayOutRule
		)
	}
}