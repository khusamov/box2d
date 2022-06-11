import {Shape} from 'planck'
import {Data} from 'anubis-data-storage'

export abstract class ShapeData extends Data {
	public shape?: Shape
}