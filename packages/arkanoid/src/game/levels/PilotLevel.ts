import {Level} from 'anubis-rule-system'
import {PhysicFeature} from 'anubis-physic-system'
import {GameBoardStartRule} from '../rules/start/GameBoardStartRule'
import {BrickWallStartRule} from '../rules/start/BrickWallStartRule'
import {BatStartRule} from '../rules/start/BatStartRule'
import {BallPositionRule} from '../rules/BallPositionRule'
import {BatMovingRule} from '../rules/BatMovingRule'
import {StartGameRule} from '../rules/StartGameRule'
import {BrickBallCollisionRule} from '../rules/BrickBallCollisionRule'
import {GameScoreRule} from '../rules/GameScoreRule'
import {BallStartRule} from '../rules/start/BallStartRule'
import {EntityDeletionRule} from 'anubis-deletion-system'
import {BrickBallCollisionSoundRule} from '../rules/BrickBallCollisionSoundRule'

/**
 * Пилотный уровень арканоида.
 */
export class PilotLevel extends Level {
	public constructor() {
		super(
			new EntityDeletionRule,
			new PhysicFeature,

			new GameBoardStartRule,
			new BatStartRule,
			new BallStartRule,
			new BrickWallStartRule,

			new BrickBallCollisionSoundRule,

			new StartGameRule,
			new GameScoreRule,
			new BallPositionRule,
			new BatMovingRule,
			new BrickBallCollisionRule
		)
	}
}