import {IDisposable} from '../interfaces'

export class DisposableArray<D extends IDisposable = IDisposable> extends Array<D> implements IDisposable {
	public dispose() {
		this.forEach(disposer => disposer.dispose())
	}
}