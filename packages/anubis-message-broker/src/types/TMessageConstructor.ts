import {IMessage} from '../interfaces/IMessage'

export type TMessageConstructor<M extends IMessage = IMessage> = new(...params: any[]) => M