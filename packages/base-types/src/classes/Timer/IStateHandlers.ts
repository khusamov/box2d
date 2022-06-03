/**
 * Карта скриптов по состояниям таймера.
 */
export interface IStateHandlers<R> {
	started?: () => R
	paused?: () => R
	stopped?: () => R
}