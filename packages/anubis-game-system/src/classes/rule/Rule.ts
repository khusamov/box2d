import {resolve} from 'inversion-of-control'
import {IRule} from '../../interfaces/IRule'
import {IData} from '../../interfaces/IData'
import {SubscribeRuleHelper} from './SubscribeRuleHelper'
import {EmitterRuleHelper} from './EmitterRuleHelper'

/**
 * Игровое правило.
 */
export abstract class Rule implements IRule {
	/**
	 * Помощник правила.
	 * Позволяет подписываться на сообщения.
	 * @protected
	 */
	protected readonly subscribe = new SubscribeRuleHelper(this)

	/**
	 * Помощник правила.
	 * Позволяет отправлять сообщения.
	 * @protected
	 */
	protected readonly emitter = new EmitterRuleHelper(this)

	/**
	 * Помощник правила.
	 * Позволяет получить доступ к массивы игровых данных и сущностей.
	 * @protected
	 */
	protected get data(): Readonly<IData[]> {
		return resolve<IData[]>('EntityDataList')
	}

	public abstract execute(): void

	public dispose() {
		this.subscribe.dispose()
	}
}