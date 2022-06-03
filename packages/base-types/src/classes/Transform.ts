import {Vector} from './Vector';
import {Convert} from './Convert';

export class Transform {
	private transforms: string[] = []

	public scale({x, y}: Vector): this {
		this.transforms.push(`scale(${x}, ${y})`)
		return this
	}

	/**
	 * @param angle Угол в радианах.
	 */
	public rotate(angle: number): this {
		this.transforms.push(`rotate(${Convert.toDegree(angle)})`)
		return this
	}

	public translate({x, y}: Vector): this {
		this.transforms.push(`translate(${x}, ${y})`)
		return this
	}

	public toString(): string {
		return this.transforms.join(', ')
	}
}