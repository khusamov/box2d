import {IDisposable} from '../interfaces/IDisposable'

export class DisposableArray<D extends IDisposable = IDisposable> extends Array<D> implements IDisposable {
	public dispose() {
		this.forEach(disposer => disposer.dispose())
	}
}