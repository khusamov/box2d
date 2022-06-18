import {Level} from 'anubis-rule-system'
import {PhysicFeature} from 'anubis-physic-system'
import {GameBoardStartRule} from './GameBoardStartRule'
import {BrickWallStartRule} from './BrickWallStartRule'
import {BatStartRule} from './BatStartRule'
import {BallPositionRule} from '../../rules/BallPositionRule'
import {BatMovingRule} from '../../rules/BatMovingRule'
import {StartGameRule} from '../../rules/StartGameRule'
import {BrickBallCollisionRule} from '../../rules/BrickBallCollisionRule'
import {GameScoreRule} from '../../rules/GameScoreRule'

export class Level1 extends Level {
	public constructor() {
		super(
			new PhysicFeature,

			new GameBoardStartRule,
			new BatStartRule,
			new BrickWallStartRule,

			new BallPositionRule,
			new BatMovingRule,
			new StartGameRule,
			new BrickBallCollisionRule,
			new GameScoreRule
		)
	}
}