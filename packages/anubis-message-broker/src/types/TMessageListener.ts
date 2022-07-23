import {IMessage} from '../interfaces/IMessage'
import {TMessageListenerContext} from "./TMessageListenerContext";
import {TUserContext} from './TUserContext'

export type TMessageListener<M extends IMessage, C extends TUserContext> = (message: M, context: TMessageListenerContext<C>) => void