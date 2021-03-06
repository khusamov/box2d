import {IDisposable} from '../../interfaces/IDisposable'
import {IKeyboardListeners} from './IKeyboardListeners'
import {ShortcutDispatcher} from './ShortcutDispatcher'

export class Shortcut {
	public static register(key: string, listeners: IKeyboardListeners): IDisposable {
		return ShortcutDispatcher.instance.register(key, listeners)
	}
}