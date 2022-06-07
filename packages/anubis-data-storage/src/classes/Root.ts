import {IRoot} from '../interfaces/IRoot'
import {IEntity} from '../interfaces/IEntity'

export class Root extends Array<IEntity> implements IRoot {}