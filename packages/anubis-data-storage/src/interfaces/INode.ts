export const parentNodeSymbol = Symbol.for('ParentNode')

export interface INode extends Object {
	[parentNodeSymbol]?: INode
}