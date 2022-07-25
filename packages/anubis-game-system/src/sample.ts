import {Level} from 'anubis-rule-system'
import {GameCreator} from './classes/GameCreator'

const game = new GameCreator(new Level).create()

game.start()
const timeInterval = 0
game.update(timeInterval)
game.pause()
game.toggle()
game.dispose()