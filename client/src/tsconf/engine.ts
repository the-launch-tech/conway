import { IGameCell, IGameMemo } from './game'

export interface IDefaultProps {
  steps: number
  size: number
}

export interface ICallbacks {
  memoGet: (key: string) => any
  memoHas: (key: string) => any
  memoValues: () => any
}

export interface IStyles {
  cellStroke: string
  cellFill: string
  gridLightStroke: string
  gridDarkStroke: string
  gridStrokeWidth: number
}

export interface IEngineOps {
  steps?: number
  size?: number
  callbacks?: ICallbacks
  styles?: IStyles
}

export interface IEngine {
  step: number
  steps: number
  width: number
  height: number
  container: React.ElementRef<any> | null
  ref: any
  boardCanvas: React.ElementRef<any>
  cellCanvas: React.ElementRef<any>
  boardContext: CanvasRenderingContext2D
  cellContext: CanvasRenderingContext2D
  callbacks: ICallbacks
  styles: IStyles
  loadProps: (props: IEngineOps) => void
  findEventTargetCoordinates: (
    event: React.MouseEvent,
    container: React.ElementRef<any>
  ) => number[]
  listenForMouseEvents: (type: string, callback: Function) => void
  cellDeath: (living: boolean, count: number) => boolean
  cellBirth: (living: boolean, count: number) => boolean
  clearCellCanvas: () => void
  clearBoardCanvas: () => void
  drawBoardCanvas: (clear?: boolean) => void
  fillCell: (cell: IGameCell) => void
  unfillCell: (cell: IGameCell) => void
  theGameOfLife: () => Array<string[]>
}
