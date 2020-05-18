import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import Actions from '../redux/actions'

import {
  ICell,
  IGameRow,
  IGameCell,
  IGameBoard,
  IState,
  IActionHandlers,
  IGameCoordinates,
  ICellCoordinates,
} from '../tsconf'

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>) => ({
  deleteMemo: (coords: ICellCoordinates) => dispatch(Actions.Game.deleteMemo(coords)),
  setMemo: (coords: ICellCoordinates, cell: IGameCell) =>
    dispatch(Actions.Game.setMemo(coords, cell)),
})

const mapStateToProps = (state: IState) => ({
  active: state.Game.active,
  memo: state.Game.memo,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell)

function Cell(
  props: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ICell
): JSX.Element {
  const { active, rowIndex, cellIndex, memo } = props

  function toggleStarterCell(event: React.MouseEvent): void {
    if (active) {
      return
    }

    if (memo.has(`${rowIndex}-${cellIndex}`)) {
      props.deleteMemo({ x: rowIndex, y: cellIndex })
    } else {
      props.setMemo(
        { x: rowIndex, y: cellIndex },
        { x: parseInt(rowIndex), y: parseInt(cellIndex), active: true }
      )
    }
  }

  return (
    <div id={`cell-${rowIndex}-${cellIndex}`} className="cell" onClick={toggleStarterCell}></div>
  )
}
