import {IStateHandlers} from './IStateHandlers';
import {ETimerState} from './timerTypes';

/**
 * Запустить определенный скрипт в зависимости от состояния таймера.
 * @param state Текущее состояние таймера.
 * @param stateHandlers Массив скриптов (ключ - имя состояния, значение - скрипт).
 */
export function handleByState<R = any>(state: ETimerState, stateHandlers: IStateHandlers<R>): R | undefined {
	switch (state) {
		case ETimerState.Started: return stateHandlers.started ? stateHandlers.started() : undefined
		case ETimerState.Paused: return stateHandlers.paused ? stateHandlers.paused() : undefined
		case ETimerState.Stopped: return stateHandlers.stopped ? stateHandlers.stopped() : undefined
	}
}