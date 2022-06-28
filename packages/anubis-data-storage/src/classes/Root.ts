import {IRoot} from '../interfaces/IRoot'
import {IEntity} from '../interfaces/IEntity'
import {SimpleArray} from 'base-types'

export class Root extends SimpleArray<IEntity> implements IRoot {}