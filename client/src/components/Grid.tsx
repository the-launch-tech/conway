import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import Row from './Row'
import Cell from './Cell'

import { IGrid, IState } from '../tsconf'

const mapStateToProps = (state: IState) => ({
  size: state.Setting.size,
})

export default connect(mapStateToProps)(Grid)

function Grid(props: ReturnType<typeof mapStateToProps> & IGrid): JSX.Element {
  const { size } = props

  const rows = React.useMemo(
    () =>
      [...Array(size.yLen)].map((row, r) => {
        let rowCells = [...Array(size.xLen)].map((cell, c) => (
          <Cell key={c.toString()} cellIndex={r.toString()} rowIndex={c.toString()} />
        ))
        return <Row key={r.toString()} cellIndex={r.toString()} cells={rowCells} />
      }),
    [size.xLen, size.yLen]
  )

  return <div className="grid">{rows}</div>
}
