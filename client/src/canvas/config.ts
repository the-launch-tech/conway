import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import Actions from '../redux/actions'

import { IState, IGameCell, ICellCoordinates, IGameMemo } from '../tsconf'

export const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>) => ({
  updateHistory: (memo: IGameMemo) => dispatch(Actions.Game.updateHistory(memo)),
  toggleGameActive: (isActive: boolean) => dispatch(Actions.Game.toggleGameActive(isActive)),
  clearMemo: () => dispatch(Actions.Game.clearMemo()),
  updateMemo: (born: string[], dead: string[]) => dispatch(Actions.Game.updateMemo({ born, dead })),
  deleteMemo: (coords: ICellCoordinates) => dispatch(Actions.Game.deleteMemo(coords)),
  setMemo: (coords: ICellCoordinates, cell: IGameCell) =>
    dispatch(Actions.Game.setMemo(coords, cell)),
})

export const mapStateToProps = (state: IState) => ({
  speed: state.Setting.speed,
  steps: state.Setting.steps,
  memo: state.Game.memo,
  history: state.Game.history,
  gameHistory: state.Game.gameHistory,
  active: state.Game.active,
})

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export interface State {
  square: number
}
