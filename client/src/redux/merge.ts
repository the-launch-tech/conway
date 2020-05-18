import { ISettingState, IGameState } from '../tsconf'

export default {
  Setting: (state: ISettingState, newState: object): ISettingState => {
    return Object.assign({}, state, newState)
  },
  Game: (state: IGameState, newState: object): IGameState => {
    return Object.assign({}, state, newState)
  },
}
