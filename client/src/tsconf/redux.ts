import { AnyAction } from 'redux'

import { IGameMemo, IGameHistory } from './game'

export interface ISettingState {
  steps: number
  speed: number
}

export interface IGameState {
  active: boolean
  memo: IGameMemo
  history: IGameMemo[]
  gameHistory: IGameHistory
}

export interface IState {
  Setting: ISettingState
  Game: IGameState
}

export interface ISettingTypes {
  UPDATE_SETTING: reduxTypeConstant
}

export interface IGameTypes {
  TOGGLE_GAME_ACTIVE: reduxTypeConstant
  CLEAR_MEMO: reduxTypeConstant
  CLEAR_HISTORY: reduxTypeConstant
  UPDATE_MEMO: reduxTypeConstant
  DELETE_MEMO: reduxTypeConstant
  SET_MEMO: reduxTypeConstant
  UPDATE_GAME_HISTORY: reduxTypeConstant
  UPDATE_HISTORY: reduxTypeConstant
}

export interface IActionTypes {
  Setting: ISettingTypes
  Game: IGameTypes
}

export interface IAction extends AnyAction {
  type: string
  payload: any
}

export type reduxTypeConstant = string
