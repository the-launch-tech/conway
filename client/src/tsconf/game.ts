export interface IGameCell {
  x: number
  y: number
  active: boolean
}

export interface ICellCoordinates {
  x: string
  y: string
}

export type IGameMemo = Map<string, IGameCell>

export interface IRecurrences {
  [coordinateString: string]: number
}

export interface IGameHistory {
  [name: number]: IGameMemo[]
}

export interface IGameSettings {
  [key: string]: any
}

export interface IUpdateGameSetting {
  key: string
  value: any
}
