import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system-2'
import {DataStorageFasade, Entity} from 'anubis-data-storage'
import {IdentificationData} from '../data/IdentificationData'
import {GameScoreData} from '../data/GameScoreData'
import {BrickBallCollisionMessage} from '../messages/BrickBallCollisionMessage'

/**
 * 	Счет в игре.
 */
export class GameScoreRule extends Rule {
	// TODO А ведь кешировать данные в правилах запрещено...
	private gameScoreData: GameScoreData = new GameScoreData

	public init(): void {
		this.addGameScoreEntity()
		this.addBrickBallCollisionHandler()
	}

	/**
	 * Добавить обработчик столкновения мячика с кирпичиком.
	 */
	private addBrickBallCollisionHandler() {
		this.messageEmitter.on(BrickBallCollisionMessage, () => {
			this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
				const gameScoreData = (
					new GameScoreData(
						this.gameScoreData.score + calculateScoreIncrement(this.gameScoreData),
						performance.now()
					)
				)
				new DataStorageFasade(dataStorage).createDataFasade(this.gameScoreData).replace(gameScoreData)
				this.gameScoreData = gameScoreData
			})
		})
	}

	/**
	 * Добавить сущность для хранения счета в игре.
	 */
	private addGameScoreEntity() {
		this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
			new DataStorageFasade(dataStorage).addEntity(
				new Entity(
					new IdentificationData({type: 'GameScore'}),
					this.gameScoreData
				)
			)
		})
	}
}

function calculateScoreIncrement(gameScoreData: GameScoreData): number {
	const firstScoreIncrement = 10
	const maxScoreIncrement = 100
	const oneScore = 10000
	let scoreIncrement = firstScoreIncrement
	const now = performance.now()
	if (gameScoreData.time) {
		// Чем меньше временной интервал, тем больше очков начисляется.
		const timeInterval = now - gameScoreData.time
		scoreIncrement = Math.min(Math.round(oneScore / timeInterval), maxScoreIncrement)
	}
	return scoreIncrement
}
