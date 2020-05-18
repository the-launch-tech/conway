import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import Actions from './redux/actions'
import Grid from './components/Grid'
import ActionHandlers from './components/ActionHandlers'
import Settings from './components/Settings'
import Header from './components/Header'
import Title from './components/Title'
import Container from './components/Container'

import {
  IState,
  IUpdateGameSetting,
  IGameCell,
  IRecurrences,
  IGameCoordinates,
  ICellCoordinates,
  IGameRow,
  IGameMemo,
} from './tsconf'

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>) => ({
  updateHistory: (memo: IGameMemo) => dispatch(Actions.Game.updateHistory(memo)),
  toggleGameActive: (isActive: boolean) => dispatch(Actions.Game.toggleGameActive(isActive)),
  incrementStep: () => dispatch(Actions.Game.incrementStep()),
  clearMemo: () => dispatch(Actions.Game.clearMemo()),
  updateMemo: (born: string[], dead: string[]) => dispatch(Actions.Game.updateMemo({ born, dead })),
})

const mapStateToProps = (state: IState) => ({
  size: state.Setting.size,
  speed: state.Setting.speed,
  memo: state.Game.memo,
  history: state.Game.history,
  gameHistory: state.Game.gameHistory,
  active: state.Game.active,
  step: state.Game.step,
})

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class Main extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props)

    this.startTheGameOfLife = this.startTheGameOfLife.bind(this)
    this.getNeighbors = this.getNeighbors.bind(this)
    this.buildNeighborCoords = this.buildNeighborCoords.bind(this)
  }

  componentDidUpdate(prevProps: Props, prevState: never) {
    if (prevProps.active !== this.props.active) {
      if (this.props.active && this.props.memo.size > 2) {
        this.startTheGameOfLife()
      }
    }
    if (prevProps.size !== this.props.size) {
      this.props.clearMemo()
    }
    if (prevProps.memo !== this.props.memo) {
      let prevKeys = prevProps.memo.keys()
      for (let key of prevKeys) {
        if (!this.props.memo.get(key)) {
          let cell = document.getElementById(`cell-${key}`)
          if (!!cell) {
            cell.classList.remove('active-cell')
          }
        }
      }
      for (let key of this.props.memo.keys()) {
        if (!prevProps.memo.get(key)) {
          let cell = document.getElementById(`cell-${key}`)
          if (!!cell) {
            cell.classList.add('active-cell')
          }
        }
      }
    }
  }

  iterateThroughLife(callback: Function) {
    callback()
    setTimeout(() => {
      if (this.props.active) {
        this.iterateThroughLife(callback)
      }
    }, this.props.speed)
  }

  startTheGameOfLife(): void {
    this.iterateThroughLife(() => {
      let groups: IGameCell[] = []

      for (let cell of this.props.memo.values()) {
        groups = [...groups, ...this.getNeighbors(cell)]
      }

      const recurrences = groups.reduce((acc: IRecurrences, cell: IGameCell): IRecurrences => {
        const key: string = `${cell.x}-${cell.y}`
        acc[key] = !!acc[key] ? acc[key] + 1 : 1
        return acc
      }, {})

      let born: string[] = []
      let dead: string[] = []
      Object.keys(recurrences).map(key => {
        const cell = recurrences[key]
        if (this.props.memo.get(key) && (cell < 2 || cell > 3)) {
          dead.push(key)
        } else if (!this.props.memo.get(key) && cell === 3) {
          born.push(key)
        }
      })

      if (born.length || dead.length) {
        this.props.updateMemo(born, dead)
      } else {
        this.props.toggleGameActive(false)
      }

      this.props.updateHistory(this.props.memo)
    })
  }

  getNeighbors(cell: IGameCell): IGameCell[] {
    let cells: IGameCell[] = []
    const { x, y } = cell
    const neighborCoords: ICellCoordinates[] = this.buildNeighborCoords(x, y)
    for (let i: number = 0; i < neighborCoords.length; i++) {
      let coord: ICellCoordinates = neighborCoords[i]
      const cell: IGameCell | undefined = this.props.memo.get(`${coord.x}-${coord.y}`)
      cells.push(!!cell ? cell : { x: parseInt(coord.x), y: parseInt(coord.y), active: false })
    }
    return cells
  }

  buildNeighborCoords(x: number, y: number): ICellCoordinates[] {
    let cells = []
    const xString: string = x.toString()
    const yString: string = y.toString()
    const xLeftString: string | null = x - 1 >= 0 ? (x - 1).toString() : null
    const xRightString: string | null = x + 1 < this.props.size.xLen ? (x + 1).toString() : null
    const yTopString: string | null = y + 1 < this.props.size.yLen ? (y + 1).toString() : null
    const yBottomString: string | null = y - 1 >= 0 ? (y - 1).toString() : null
    if (xLeftString) {
      if (yTopString) {
        cells.push({ x: xLeftString, y: yTopString })
      }
      cells.push({ x: xLeftString, y: yString })
      if (yBottomString) {
        cells.push({ x: xLeftString, y: yBottomString })
      }
    }
    if (yTopString) {
      cells.push({ x: xString, y: yTopString })
    }
    if (yBottomString) {
      cells.push({ x: xString, y: yBottomString })
    }
    if (xRightString) {
      if (yTopString) {
        cells.push({ x: xRightString, y: yTopString })
      }
      cells.push({ x: xRightString, y: yString })
      if (yBottomString) {
        cells.push({ x: xRightString, y: yBottomString })
      }
    }
    return cells
  }

  render() {
    return (
      <Container type="wrapper" layout={['flex-column', 'justify-center', 'align-center']}>
        <React.Fragment>
          <Header>
            <Title text="Conway's Game of Life" />
          </Header>
          <Settings />
          <Container type="content" layout={['flex-column', 'align-start']}>
            <React.Fragment>
              <Grid />
              <ActionHandlers />
            </React.Fragment>
          </Container>
        </React.Fragment>
      </Container>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
