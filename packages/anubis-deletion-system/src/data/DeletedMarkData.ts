import {Data} from 'anubis-data-storage'

/**
 * Просто так сущность удалять нельзя.
 * Для удаления сущности следует в него добавить данные DeletedMarkData
 * и соответствующее правило его удалит.
 */
export class DeletedMarkData extends Data {}