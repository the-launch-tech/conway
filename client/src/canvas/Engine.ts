import * as React from 'react'

import {
  IGameCell,
  IRecurrences,
  ICellCoordinates,
  IGameMemo,
  IDefaultProps,
  ICallbacks,
  IStyles,
  IEngineOps,
  IEngine,
} from '../tsconf'

export default class Engine {
  public step: number
  public steps: number
  public width: number
  public height: number
  public container: React.ElementRef<any> | null
  public boardCanvas: React.ElementRef<any>
  public cellCanvas: React.ElementRef<any>
  public boardContext: CanvasRenderingContext2D
  public cellContext: CanvasRenderingContext2D
  public callbacks: ICallbacks
  public styles: IStyles
  public ref: any

  constructor(defaults: IDefaultProps) {
    this.width = Math.floor(defaults.width / 10) * 10
    this.height = Math.floor(defaults.height / 10) * 10
    this.steps = defaults.steps
    this.step = this.calculateStepSize()
    this.ref = null
    this.container = null
    this.styles = {
      cellStroke: 'blue',
      cellFill: 'blue',
      gridLightStroke: 'grey',
      gridDarkStroke: 'grey',
      gridStrokeWidth: 1,
    }
    this.callbacks = {
      memoGet: (key: string) => {},
      memoHas: (key: string) => {},
      memoValues: () => {},
    }
    this.boardCanvas = document.createElement('canvas')
    this.cellCanvas = document.createElement('canvas')
    this.boardCanvas.id = 'board-canvas'
    this.cellCanvas.id = 'cell-canvas'
    this.boardContext = this.boardCanvas.getContext('2d')
    this.cellContext = this.cellCanvas.getContext('2d')
    this.boardCanvas.width = this.width
    this.boardCanvas.height = this.height
    this.cellCanvas.width = this.width
    this.cellCanvas.height = this.height

    this.loadProps = this.loadProps.bind(this)
    this.drawBoardCanvas = this.drawBoardCanvas.bind(this)
    this.fillCell = this.fillCell.bind(this)
    this.unfillCell = this.unfillCell.bind(this)
    this.clearCellCanvas = this.clearCellCanvas.bind(this)
    this.clearBoardCanvas = this.clearBoardCanvas.bind(this)
    this.findEventTargetCoordinates = this.findEventTargetCoordinates.bind(this)
    this.listenForMouseEvents = this.listenForMouseEvents.bind(this)
    this.cellDeath = this.cellDeath.bind(this)
    this.cellBirth = this.cellBirth.bind(this)
    this.theGameOfLife = this.theGameOfLife.bind(this)
  }

  loadProps(props: IEngineOps): void {
    if (props.styles) {
      this.styles = props.styles
    }
    if (props.steps) {
      this.steps = props.steps
      this.step = this.calculateStepSize()
      this.clearCellCanvas()
      this.clearBoardCanvas()
      this.drawBoardCanvas(true)
    }
    if (props.width && props.height) {
      this.width = Math.floor(props.width / 10) * 10
      this.height = Math.floor(props.height / 10) * 10
      this.cellCanvas.width = this.width
      this.cellCanvas.height = this.height
      this.boardCanvas.width = this.width
      this.boardCanvas.height = this.height
      this.step = this.calculateStepSize()
      this.clearCellCanvas()
      this.drawBoardCanvas(true)
    }
    if (props.callbacks) {
      this.callbacks = props.callbacks
    }
  }

  calculateStepSize(): number {
    return Math.floor(this.width / this.steps)
  }

  findEventTargetCoordinates(event: React.MouseEvent, container: React.ElementRef<any>): number[] {
    const xCoord: number = event.pageX - container.offsetLeft
    const yCoord: number = event.pageY - container.offsetTop
    return [Math.floor(xCoord / this.step), Math.floor(yCoord / this.step)]
  }

  listenForMouseEvents(type: string, callback: Function): void {
    this.cellCanvas.addEventListener(type, callback)
  }

  cellDeath(living: boolean, count: number): boolean {
    return living && (count < 2 || count > 3)
  }

  cellBirth(living: boolean, count: number): boolean {
    return !living && count === 3
  }

  clearBoardCanvas(): void {
    this.boardContext.clearRect(0, 0, this.width, this.height)
  }

  clearCellCanvas(): void {
    this.cellContext.clearRect(0, 0, this.width, this.height)
  }

  drawBoardCanvas(clear?: boolean): void {
    if (clear) {
      this.boardContext.clearRect(0, 0, this.width, this.height)
    }
    let xIndex = 0
    for (let x = 0; x <= this.width; x += this.step) {
      this.boardContext.beginPath()
      this.boardContext.moveTo(x, 0)
      this.boardContext.lineTo(x, this.height - (this.height % this.step))
      this.boardContext.strokeStyle =
        xIndex % 10 === 0 ? this.styles.gridDarkStroke : this.styles.gridLightStroke
      this.boardContext.lineWidth = this.styles.gridStrokeWidth
      this.boardContext.stroke()
      xIndex++
    }
    let yIndex = 0
    for (let y = 0; y <= this.height; y += this.step) {
      this.boardContext.beginPath()
      this.boardContext.moveTo(0, y)
      this.boardContext.lineTo(this.width, y)
      this.boardContext.strokeStyle =
        yIndex % 10 === 0 ? this.styles.gridDarkStroke : this.styles.gridLightStroke
      this.boardContext.lineWidth = this.styles.gridStrokeWidth
      this.boardContext.stroke()
      yIndex++
    }
    this.cellContext.fillStyle = this.styles.cellFill
    this.cellContext.strokeStyle = this.styles.cellStroke
  }

  fillCell(cell: IGameCell): void {
    this.cellContext.fillRect(cell.x * this.step, cell.y * this.step, this.step, this.step)
  }

  unfillCell(cell: IGameCell): void {
    this.cellContext.clearRect(cell.x * this.step, cell.y * this.step, this.step, this.step)
  }

  theGameOfLife(): Array<string[]> {
    let groups: IGameCell[] = []

    for (let { x, y } of this.callbacks.memoValues()) {
      for (let i = -1; i <= 1; i++) {
        if (x + i >= 0 && x + i < this.steps) {
          for (let j = -1; j <= 1; j++) {
            if (y + j >= 0 && y + j < this.steps && (x + i !== x || y + j !== y)) {
              let neighborCell: IGameCell | undefined = this.callbacks.memoGet(`${x + i}-${y + j}`)
              groups.push(!!neighborCell ? neighborCell : { x: x + i, y: y + j, active: false })
            }
          }
        }
      }
    }

    const recurrences = groups.reduce((acc: IRecurrences, cell: IGameCell): IRecurrences => {
      const key: string = `${cell.x}-${cell.y}`
      acc[key] = !!acc[key] ? acc[key] + 1 : 1
      return acc
    }, {})

    let born: string[] = []
    let dead: string[] = []
    Object.keys(recurrences).map((key: string): void => {
      const [x, y]: string[] = key.split('-')
      const cell: IGameCell = { x: parseInt(x), y: parseInt(y), active: true }
      const count: number = recurrences[key]
      const living: boolean = this.callbacks.memoHas(key)
      if (this.cellDeath(living, count)) {
        dead.push(key)
        this.unfillCell(cell)
      } else if (this.cellBirth(living, count)) {
        born.push(key)
        this.fillCell(cell)
      }
    })

    return [born, dead]
  }
}
