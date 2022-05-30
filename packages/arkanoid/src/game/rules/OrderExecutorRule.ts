import {IRule} from '../base/interfaces/IRule'
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment'
import {hasData} from '../base/Entity'
import {Order} from '../data/Order'
import {isData} from '../base/interfaces/IData'

export class OrderExecutorRule implements IRule {
	private game: IGameEnvironment | undefined

	init(game: IGameEnvironment) {
		this.game = game
	}

	update() {
		if (this.game) {
			const {entityList} = this.game
			const orderEntity = entityList.find(hasData(Order))
			if (orderEntity) {
				const orderDataList = orderEntity.filter(isData(Order))
				for (const orderData of orderDataList) {
					orderData.execute(this.game)
					orderEntity.splice(orderEntity.indexOf(orderData), 1)
				}
			}
		}
	}
}