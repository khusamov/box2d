import {externalDataSymbol} from '../const/externalDataSymbol'

/**
 * Специальная метка для того, чтобы отличить данные с внешними ссылками.
 */
export interface IExternalData {
	readonly [externalDataSymbol]: boolean
}