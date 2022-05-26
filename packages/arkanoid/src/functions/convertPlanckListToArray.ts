interface IElement {
	getNext(): IElement | null
}

export function convertPlanckListToArray<T extends IElement>(element: T | null): T[] {
	const result: T[] = []
	while (element) {
		result.push(element)
		element = element.getNext() as T | null
	}
	return result
}