export function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
	if (value < inMin || value > inMax) {
		throw new RangeError(`Значение ${value} за пределами диапазона [${inMin}, ${inMax}]`)
	}

	if (inMax - inMin === 0) {
		return (outMin + outMax) / 2
	}

	return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}