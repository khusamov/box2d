import {IMessage} from '../interfaces/IMessage'

export type TMessageListener<M extends IMessage> = (message: M) => void