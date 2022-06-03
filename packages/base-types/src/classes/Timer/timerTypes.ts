import {Timer} from './Timer';

/**
 * Тип действия таймера, которое выполняется на каждый тик.
 */
export type TTimerAction = (this: Timer) => void

/**
 * Состояния таймера.
 */
export enum ETimerState {
	Started = 'started',
	Paused = 'paused',
	Stopped = 'stopped'
}