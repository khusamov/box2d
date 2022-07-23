import {IDisposable} from 'base-types/src'

/**
 * Создать клон-объект для disposer.
 * Внимание, метод dispose() должен быть открепляемым.
 * @param disposer
 */
export function createDisposableClone(disposer: IDisposable): IDisposable {
    return {
        dispose: disposer.dispose
    }
}