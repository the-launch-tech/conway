import Types from '../types/index'
import merge from '../merge'
import initialState from '../initialState'

import {
  IAction,
  IState,
  IGameState,
  ICellCoordinates,
  IGameCell,
  IGameMemo,
  IGameHistory,
} from '../../tsconf'

const { log, error } = console

export default (state: IGameState = initialState.Game, action: IAction) => {
  switch (action.type) {
    case Types.Game.TOGGLE_GAME_ACTIVE:
      return toggleGameActive(state, action.payload)
    case Types.Game.CLEAR_MEMO:
      return clearMemo(state)
    case Types.Game.CLEAR_HISTORY:
      return clearHistory(state)
    case Types.Game.UPDATE_MEMO:
      return updateMemo(state, action.payload)
    case Types.Game.DELETE_MEMO:
      return deleteMemo(state, action.payload)
    case Types.Game.SET_MEMO:
      return setMemo(state, action.payload)
    case Types.Game.UPDATE_GAME_HISTORY:
      return updateGameHistory(state, action.payload)
    case Types.Game.UPDATE_HISTORY:
      return updateHistory(state, action.payload)
    default:
      return state
  }
}

const toggleGameActive = (state: IGameState, payload: IAction['payload']): IGameState => {
  return merge.Game(state, { active: payload })
}

const clearMemo = (state: IGameState): IGameState => {
  return merge.Game(state, { memo: new Map() })
}

const clearHistory = (state: IGameState): IGameState => {
  return merge.Game(state, { history: [] })
}

const updateMemo = (state: IGameState, payload: IAction['payload']): IGameState => {
  const clone: IGameMemo = new Map(state.memo)
  payload.born.forEach((cell: string) => {
    let [x, y] = cell.split('-')
    clone.set(cell, { x: parseInt(x), y: parseInt(y), active: true })
  })
  payload.dead.forEach((cell: string) => {
    clone.delete(cell)
  })
  return merge.Game(state, { memo: clone })
}

const deleteMemo = (state: IGameState, payload: IAction['payload']): IGameState => {
  const clone: IGameMemo = new Map(state.memo)
  clone.delete(`${payload.x}-${payload.y}`)
  return merge.Game(state, { memo: clone })
}

const setMemo = (state: IGameState, payload: IAction['payload']): IGameState => {
  const clone: IGameMemo = new Map(state.memo)
  clone.set(`${payload.coords.x}-${payload.coords.y}`, payload.cell)
  return merge.Game(state, { memo: clone })
}

const updateGameHistory = (state: IGameState, payload: IAction['payload']): IGameState => {
  const name: number = Date.now()
  const gameHistory: IGameHistory = Object.assign({}, state.gameHistory)
  gameHistory[name] = state.history
  return merge.Game(state, { gameHistory })
}

const updateHistory = (state: IGameState, payload: IAction['payload']): IGameState => {
  const clone: IGameMemo = new Map(state.memo)
  const history: IGameMemo[] = Object.assign([], state.history)
  return merge.Game(state, { history: [...history, clone] })
}
