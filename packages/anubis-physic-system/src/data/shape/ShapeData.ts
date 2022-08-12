import {Shape} from 'planck'
import {Data} from 'anubis-data-storage'

export abstract class ShapeData<S extends Shape = Shape> extends Data {
	public constructor(public readonly shape?: S) {
		super()
	}

	public abstract clone(shape?: S): ShapeData<S>
}