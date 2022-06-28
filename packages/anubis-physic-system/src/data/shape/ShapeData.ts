import {Shape} from 'planck'
import {Data} from 'anubis-data-storage'

export abstract class ShapeData<S extends Shape = Shape> extends Data {

	// TODO Тут проблема - конструктор должен быть защищенным, но в FixtureCreatorRule он нужен публичный((

	constructor(public readonly shape?: S) {
		super()
	}
	public abstract clone(shape?: S): ShapeData<S>
}