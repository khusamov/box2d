export type {DataConstructor} from './types/DataConstructor'

export type {IData} from './interfaces/IData'
export type {IDataStorage} from './interfaces/IDataStorage'
export type {IEntity} from './interfaces/IEntity'
export type {INode} from './interfaces/INode'
export type {IRoot} from './interfaces/IRoot'

export {isDataLike} from './functions/isDataLike'
export {isEntityLike} from './functions/isEntityLike'
export {isData} from './functions/isData'
export {isEntity} from './functions/isEntity'
export {setParent} from './functions/setParent'

export {DataAddingMessage} from './messages/DataAddingMessage'
export {DataDeletingMessage} from './messages/DataDeletingMessage'
export {DataReplacingMessage} from './messages/DataReplacingMessage'

export {Root} from './classes/Root'
export {DataStorage} from './classes/DataStorage'
export {DataStorageFasade} from './classes/DataStorageFasade'

export {Data} from './classes/data/Data'
export {DataFasade} from './classes/data/DataFasade'
export {DataAddingOperation} from './classes/data/DataAddingOperation'
export {DataDeletingOperation} from './classes/data/DataDeletingOperation'
export {DataReplacingOperation} from './classes/data/DataReplacingOperation'

export {Entity} from './classes/entity/Entity'
export {EntityFasade} from './classes/entity/EntityFasade'
export {EntityAddingOperation} from './classes/entity/EntityAddingOperation'
export {EntityDeletingOperation} from './classes/entity/EntityDeletingOperation'