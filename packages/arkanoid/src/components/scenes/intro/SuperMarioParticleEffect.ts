import {Effect} from './Effect'

export class SuperMarioParticleEffect {
	private frame: number = 0
	private effect: Effect | undefined

	public init(canvas: HTMLCanvasElement, image: HTMLImageElement) {
		const ctx = canvas.getContext('2d');
		if (ctx) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			const effect = new Effect(canvas.width, canvas.height);
			effect.init(ctx, image);

			const animate = () => {
				effect.update();
				effect.render(ctx);
				this.frame = requestAnimationFrame(animate);
			}
			animate();

			this.effect = effect
		}
	}

	public destroy() {
		if (this.effect) {
			this.effect.destroy()
		}
		cancelAnimationFrame(this.frame)
	}
}