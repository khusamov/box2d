import {INode, parentNodeSymbol} from '../interfaces/INode'

/**
 * Установить родительский узел у нескольких узлов рекурсивно.
 * @param parentNode
 * @param nodes
 */
export function setParent(parentNode: INode, ...nodes: INode[]) {
	for (const node of nodes) {
		node[parentNodeSymbol] = parentNode
		if (Array.isArray(node)) {
			setParent(node, ...node)
		}
	}
}