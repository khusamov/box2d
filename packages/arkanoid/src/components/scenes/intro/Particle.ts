import {Effect} from './Effect'

export class Particle {
	effect: Effect
	originX: number
	originY: number
	x: number
	y: number
	size: number = 3
	color: string
	dx: number = 0
	dy: number = 0
	vx: number = 0
	vy: number = 0
	force: number = 0
	angle: number = 0
	distance: number = 0
	friction: number = 0.98
	ease: number = 0.2

	constructor(effect: Effect, x: number, y: number, color: string) {
		this.effect = effect
		this.color = color
		this.x = this.originX = x;
		this.y = this.originY = y;
	}

	update() {
		this.dx = this.effect.mouse.x - this.x;
		this.dy = this.effect.mouse.y - this.y;
		this.distance = this.dx * this.dx + this.dy * this.dy;
		this.force = -this.effect.mouse.radius / this.distance;
		if (this.distance < this.effect.mouse.radius) {
			this.angle = Math.atan2(this.dy, this.dx);
			this.vx += this.force * Math.cos(this.angle);
			this.vy += this.force * Math.sin(this.angle);
		}
		this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
		this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
	}
}