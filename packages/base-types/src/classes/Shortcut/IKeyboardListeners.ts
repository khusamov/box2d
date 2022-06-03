export type TKeyboardListener = (event: KeyboardEvent) => void

export interface IKeyboardListeners {
	down: TKeyboardListener
	up: TKeyboardListener
}