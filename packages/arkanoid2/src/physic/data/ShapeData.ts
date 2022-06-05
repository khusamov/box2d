import {Shape} from 'planck'
import {Data} from 'anubis-game-system'

export abstract class ShapeData extends Data {
	public shape?: Shape
	public abstract override clone<C extends this>(): C
}