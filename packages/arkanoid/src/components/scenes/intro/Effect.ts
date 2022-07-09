import {Particle} from './Particle'

export class Effect {
	particles: Particle[] = []
	gap: number = 3
	width: number
	height: number
	centerX: number
	centerY: number
	x: number = 0
	y: number = 0
	mouse: {
		radius: number
		x: number
		y: number
	}
	
	constructor(width: number, height: number){
		this.width = width;
		this.height = height;
		this.centerX = this.width / 2;
		this.centerY = this.height / 2;
		this.mouse = {
			radius: 5000,
			x: 0,
			y: 0
		}
		window.addEventListener("mousemove", event => {
			this.mouse.x = event.x;
			this.mouse.y = event.y;
		});
		window.addEventListener("touchstart", event => {
			if (event.changedTouches[0]) {
				this.mouse.x = event.changedTouches[0].clientX;
				this.mouse.y = event.changedTouches[0].clientY;
			}
		}, false);
		window.addEventListener("touchmove", event => {
			event.preventDefault();
			if (event.targetTouches[0]) {
				this.mouse.x = event.targetTouches[0].clientX;
				this.mouse.y = event.targetTouches[0].clientY;
			}
		}, false);
		window.addEventListener("touchend", event => {
			event.preventDefault();
			this.mouse.x = 0;
			this.mouse.y = 0;
		}, false);
	}

	destroy() {
		// TODO Добавить удаление обработчиков событий что выше.
	}

	init(context: CanvasRenderingContext2D, image: HTMLImageElement) {
		this.x = this.centerX - image.width / 2;
		this.y = this.centerY - image.height / 2;
		context.drawImage(image, this.x, this.y);
		const pixels = context.getImageData(0, 0, this.width, this.height).data;
		let index: number
		for (let y = 0; y < this.height; y += this.gap) {
			for (let x = 0; x < this.width; x += this.gap) {
				index = (y * this.width + x) * 4;
				const alpha = pixels[index + 3];
				if (alpha && alpha > 0) {
					const red = pixels[index];
					const green = pixels[index + 1];
					const blue = pixels[index + 2];
					const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
					this.particles.push(new Particle(this, x, y, color));
				}
			}
		}
		context.clearRect(0, 0, this.width, this.height);
	}

	update() {
		for (let i = 0; i < this.particles.length; i++) {
			const p = this.particles[i];
			if (p) {
				p.update();
			}
		}
	}

	render(context: CanvasRenderingContext2D) {
		context.clearRect(0, 0, this.width, this.height);
		for (let i = 0; i < this.particles.length; i++) {
			const p = this.particles[i];
			if (p) {
				context.fillStyle = p.color;
				context.fillRect(p.x, p.y, p.size, p.size);
			}
		}
	}
}