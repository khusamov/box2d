import {Level} from 'anubis-rule-system'
import {GameCreator} from './classes/GameCreator'

const game = new GameCreator(new Level).create()

game.init()
game.start()
game.update(0)
game.pause()
game.dispose()
