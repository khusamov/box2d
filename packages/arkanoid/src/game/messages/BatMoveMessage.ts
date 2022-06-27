/**
 * Изменение положения курсора мышки.
 */
export class BatMoveMessage {
	public constructor(
		public movementX: number,
		public movementY: number
	) {}
}