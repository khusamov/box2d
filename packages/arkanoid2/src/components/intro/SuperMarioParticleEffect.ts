import {Effect} from './Effect'

export class SuperMarioParticleEffect {
	init(canvas: HTMLCanvasElement, image: HTMLImageElement) {
		const ctx = canvas.getContext('2d');
		if (ctx) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			const effect = new Effect(canvas.width, canvas.height);
			effect.init(ctx, image);

			const animate = () => {
				effect.update();
				effect.render(ctx);
				requestAnimationFrame(animate);
			}
			animate();
		}
	}

	destroy() {}
}