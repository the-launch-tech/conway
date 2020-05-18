export interface IGameCell {
  x: number
  y: number
  active: boolean
  starter?: boolean
}

export interface ICellCoordinates {
  x: string
  y: string
}

export type IGameRow = Map<string, IGameCell>

export type IGameBoard = Map<string, IGameRow>

export type IGameMemo = Map<string, IGameCell>

export interface IRecurrences {
  [coordinateString: string]: number
}

export interface IGameHistory {
  [name: number]: IGameMemo[]
}

export interface IGameCoordinates {
  xLen: number
  yLen: number
}

export interface IGameSettings {
  [key: string]: any
}

export interface IUpdateGameSetting {
  key: string
  value: any
  mapFrom?: any
}
