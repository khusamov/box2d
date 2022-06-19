import {Rule} from 'anubis-rule-system'
import {clickSoundUrl} from '../../sounds'
import {BrickBallCollisionMessage} from '../messages/BrickBallCollisionMessage'

export class BrickBallCollisionSoundRule extends Rule {
	public async init() {
		const response = await fetch(clickSoundUrl)
		const clickSoundArrayBuffer = await response.arrayBuffer()

		const context = new AudioContext
		const soundGainNode = context.createGain()
		soundGainNode.gain.value = 0.25
		soundGainNode.connect(context.destination)

		const clickSoundAudioBuffer = await context.decodeAudioData(clickSoundArrayBuffer)

		this.messageEmitter.on(BrickBallCollisionMessage, () => {
			const clickSoundSourceNode = context.createBufferSource()
			clickSoundSourceNode.buffer = clickSoundAudioBuffer
			clickSoundSourceNode.connect(soundGainNode)
			clickSoundSourceNode.start()
		})
	}
}