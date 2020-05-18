import * as React from 'react'

import { IGameCell, IGameBoard, IGameSettings } from './game'

export interface IMain {}

export interface ISettings {}

export interface IButton {
  onClick: (event: React.MouseEvent) => any
  label: string
  isDisabled: boolean
  classes: string[]
  color: string
}

export interface IContainer {
  children: JSX.Element
  type: string
  layout: string[]
}

export interface IHeader {
  children: JSX.Element
}

export interface ITitle {
  text: string
}

export interface IActionHandlers {}

export interface ICell {
  rowIndex: string
  cellIndex: string
}

export interface IRow {
  cellIndex: string
  cells: React.ReactElement[]
}

export interface IGrid {}
