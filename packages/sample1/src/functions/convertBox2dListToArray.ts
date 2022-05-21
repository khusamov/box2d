interface IElement {
	GetNext(): IElement | null
}

export function convertBox2dListToArray<T extends IElement>(element: T | null): T[] {
	const result: T[] = []
	while (element) {
		result.push(element)
		element = element.GetNext() as T | null
	}
	return result
}