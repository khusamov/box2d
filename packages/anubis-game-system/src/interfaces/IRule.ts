import {ICommand, IDisposable} from 'base-types'

/**
 * Правило игры.
 *
 * Реализует шаблон ICommand, где метод execute() используется
 * для инициализации правила игры и он вызывается один раз перед началом игры.
 *
 * Также реализует IDisposable для возможности освобождать ресурсы,
 * которые были заняты данным правилом игры.
 */
export interface IRule extends ICommand, IDisposable {}