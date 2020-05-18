import Types from '../types'

import { IAction, IGameCoordinates, ICellCoordinates, IGameCell, IGameMemo } from '../../tsconf'

export const incrementStep = (): IAction => ({
  type: Types.Game.INCREMENT_STEP,
  payload: null,
})

export const toggleGameActive = (payload: boolean): IAction => ({
  type: Types.Game.TOGGLE_GAME_ACTIVE,
  payload,
})

export const clearMemo = (): IAction => ({
  type: Types.Game.CLEAR_MEMO,
  payload: null,
})

export const updateMemo = (payload: any): IAction => ({
  type: Types.Game.UPDATE_MEMO,
  payload,
})

export const deleteMemo = (payload: ICellCoordinates): IAction => ({
  type: Types.Game.DELETE_MEMO,
  payload,
})

export const setMemo = (coords: ICellCoordinates, cell: IGameCell): IAction => ({
  type: Types.Game.SET_MEMO,
  payload: {
    coords,
    cell,
  },
})

export const updateGameHistory = (payload: IGameMemo[]): IAction => ({
  type: Types.Game.UPDATE_GAME_HISTORY,
  payload,
})

export const updateHistory = (payload: IGameMemo): IAction => ({
  type: Types.Game.UPDATE_HISTORY,
  payload,
})
