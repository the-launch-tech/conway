import { IState } from '../tsconf'

import { STEPS, SPEED } from '../canvas'

export default <IState>{
  Setting: {
    steps: STEPS,
    speed: SPEED,
  },
  Game: {
    active: false,
    memo: new Map(),
    history: [],
    gameHistory: {},
  },
}
