import { IState } from '../tsconf'

export default <IState>{
  Setting: {
    size: { xLen: 76, yLen: 50 },
    speed: 200,
  },
  Game: {
    active: false,
    board: new Map(),
    memo: new Map(),
    history: [],
    gameHistory: {},
    step: 0,
  },
}
