import * as React from 'react'
import { connect } from 'react-redux'

import Engine from './Engine'
import { mapStateToProps, mapDispatchToProps, Props, State } from './config'

import {
  IGameCell,
  IRecurrences,
  ICellCoordinates,
  IGameMemo,
  IAction,
  IEngine,
} from '../tsconf/index'

const { innerWidth, innerHeight } = window
const SQUARE = innerWidth - 40 > innerHeight - 160 ? innerHeight - 160 : innerWidth - 40
export const STEPS = 100
export const SPEED = 10

const GameEngine: IEngine = new Engine({
  width: SQUARE,
  height: SQUARE,
  steps: STEPS,
})

class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    GameEngine.loadProps({
      width: SQUARE,
      height: SQUARE,
      steps: STEPS,
      styles: {
        cellStroke: '#75c2dc', // blue
        cellFill: '#75c2dc', // blue
        gridLightStroke: '#f1f1f1', // light
        gridDarkStroke: '#4f4f4f', // dark
        gridStrokeWidth: 1,
      },
      callbacks: {
        memoHas: (key: string): boolean => this.props.memo.has(key),
        memoGet: (key: string): IGameCell | undefined => this.props.memo.get(key),
        memoValues: (): IterableIterator<IGameCell> => this.props.memo.values(),
      },
    })

    this.start = this.start.bind(this)
    this.iterate = this.iterate.bind(this)
    this.createCanvasRef = this.createCanvasRef.bind(this)
    this.toggleCellActive = this.toggleCellActive.bind(this)
    this.onActiveChange = this.onActiveChange.bind(this)
    this.onStepsChange = this.onStepsChange.bind(this)
    this.onGameHistoryChange = this.onGameHistoryChange.bind(this)
    this.onResize = this.onResize.bind(this)

    this.state = {
      square: SQUARE,
    }
  }

  componentDidMount(): void {
    GameEngine.drawBoardCanvas()
    GameEngine.listenForMouseEvents('click', this.toggleCellActive)
    window.addEventListener('resize', this.onResize)
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (prevProps.active !== this.props.active) {
      this.onActiveChange()
    }
    if (prevProps.steps !== this.props.steps) {
      this.onStepsChange()
    }
    if (this.props.gameHistory !== prevProps.gameHistory) {
      this.onGameHistoryChange()
    }
  }

  onResize(event: UIEvent): void {
    const { innerWidth, innerHeight } = window
    let square = innerWidth - 40 > innerHeight - 160 ? innerHeight - 160 : innerWidth - 40
    this.setState({ square }, () => {
      GameEngine.loadProps({
        width: square,
        height: square,
      })
    })
  }

  onActiveChange() {
    if (this.props.active) {
      this.start()
    }
  }

  onStepsChange() {
    this.props.clearMemo()
    GameEngine.loadProps({ steps: this.props.steps })
    GameEngine.clearCellCanvas()
    GameEngine.drawBoardCanvas()
  }

  onGameHistoryChange() {
    GameEngine.clearCellCanvas()
  }

  iterate(callback: IEngine['theGameOfLife']): void {
    const [born, dead]: Array<string[]> = callback()

    if (born.length || dead.length) {
      this.props.updateMemo(born, dead)
    } else {
      this.props.toggleGameActive(false)
    }

    this.props.updateHistory(this.props.memo)

    setTimeout((): void => {
      if (this.props.active) {
        this.iterate(callback)
      }
    }, this.props.speed)
  }

  start(): void {
    if (!this.props.history.length) {
      this.props.updateHistory(this.props.memo)
    }

    this.iterate(GameEngine.theGameOfLife)
  }

  toggleCellActive(event: React.MouseEvent): void {
    if (this.props.active || !GameEngine.container) {
      return
    }

    const [x, y]: number[] = GameEngine.findEventTargetCoordinates(event, GameEngine.container)

    if (this.props.memo.has(`${x}-${y}`)) {
      this.props.deleteMemo({ x: x.toString(), y: y.toString() })
      GameEngine.unfillCell({ x, y, active: true })
    } else {
      this.props.setMemo({ x: x.toString(), y: y.toString() }, { x, y, active: true })
      GameEngine.fillCell({ x, y, active: true })
    }
  }

  createCanvasRef(ref: React.ElementRef<any>): void {
    GameEngine.container = ref
    GameEngine.container.appendChild(GameEngine.cellCanvas)
    GameEngine.container.appendChild(GameEngine.boardCanvas)
  }

  render(): JSX.Element {
    return (
      <div
        ref={this.createCanvasRef}
        className="canvas-wrapper"
        style={{ width: this.state.square, height: this.state.square }}
      ></div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)
