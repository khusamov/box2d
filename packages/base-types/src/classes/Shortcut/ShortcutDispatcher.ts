import {IKeyboardListeners, TKeyboardListener} from './IKeyboardListeners';
import {IDisposable} from '../../interfaces';
import {Lazy} from '../Lazy';

const codeOf = (key: string) => 'Key' + key.toUpperCase()

export class ShortcutDispatcher implements IDisposable {
	private static readonly instanceHolder = new Lazy(() => new ShortcutDispatcher)

	public static get instance(): ShortcutDispatcher {
		return this.instanceHolder.value
	}

	private readonly host: GlobalEventHandlers
	private readonly listeners: Map<string, IKeyboardListeners> = new Map
	private readonly keyDownListenerBinded: TKeyboardListener
	private readonly keyUpListenerBinded: TKeyboardListener
	private readonly theKeyWasDown: Map<string, boolean> = new Map

	public constructor(host: GlobalEventHandlers = document) {
		this.host = host
		this.keyDownListenerBinded = this.keyDownListener.bind(this)
		this.keyUpListenerBinded = this.keyUpListener.bind(this)
		this.host.addEventListener('keydown', this.keyDownListenerBinded)
		this.host.addEventListener('keyup', this.keyUpListenerBinded)
	}

	public register(key: string, listeners: IKeyboardListeners): IDisposable {
		this.listeners.set(key, listeners)
		return {
			dispose: () => {
				this.listeners.delete(key)
				this.theKeyWasDown.delete(codeOf(key))
			}
		}
	}

	private keyDownListener(event: KeyboardEvent) {
		const code = event.code

		// Если такой клавиши нет в словаре,
		if (!this.theKeyWasDown.has(code)) {
			// то добавляем ее с информацией, что ранее она еще не была нажата.
			this.theKeyWasDown.set(code, false)
		}

		// Если клавиша ранее не была нажата, то:
		if (!this.theKeyWasDown.get(code)) {
			// Помечаем что она нажата.
			this.theKeyWasDown.set(code, true)
			// И выполняем действие при нажатии на эту клавишу.
			for (const [key, listeners] of this.listeners.entries()) {
				if (code === codeOf(key)) {
					listeners.down(event)
				}
			}
		}
	}

	private keyUpListener(event: KeyboardEvent) {
		// Из события извлекаем номер нажатой клавиши.
		const code = event.code
		// Помечаем что она уже не нажата.
		this.theKeyWasDown.set(code, false)
		// Выполняем действие при отжатии клавиши.
		for (const [key, listeners] of this.listeners.entries()) {
			if (code === codeOf(key)) {
				listeners.up(event)
			}
		}
	}

	public dispose() {
		this.host.removeEventListener('keydown', this.keyDownListenerBinded)
		this.host.removeEventListener('keyup', this.keyUpListenerBinded)
	}
}