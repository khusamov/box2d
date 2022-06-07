import {INode, parentNodeSymbol} from '../interfaces/INode'

export function setParent(nodes: INode[], parentNode: INode) {
	for (const node of nodes) {
		node[parentNodeSymbol] = parentNode
		if (Array.isArray(node)) {
			setParent(node, node)
		}
	}
}