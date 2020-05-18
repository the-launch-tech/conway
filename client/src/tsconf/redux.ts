import { AnyAction } from 'redux'

import { IGameMemo, IGameCoordinates, IGameHistory } from './game'

export interface ISettingState {
  size: IGameCoordinates
  speed: number
}

export interface IGameState {
  active: boolean
  memo: IGameMemo
  history: IGameMemo[]
  gameHistory: IGameHistory
  step: number
}

export interface IState {
  Setting: ISettingState
  Game: IGameState
}

export interface ISettingTypes {
  UPDATE_SETTING: reduxTypeConstant
}

export interface IGameTypes {
  INCREMENT_STEP: reduxTypeConstant
  TOGGLE_GAME_ACTIVE: reduxTypeConstant
  CLEAR_MEMO: reduxTypeConstant
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
