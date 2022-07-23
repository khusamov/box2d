import {IMessageListenerDisposer} from "../interfaces/IMessageListenerDisposer";
import {TUserContext} from './TUserContext'

export type TMessageListenerContext<C extends TUserContext> = IMessageListenerDisposer & C