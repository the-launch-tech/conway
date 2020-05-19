import * as React from 'react'

import { IGameCell, IGameSettings } from './game'

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
  flexWidth?: number
}

export interface IHeader {
  children: JSX.Element
}

export interface ITitle {
  text: string
}
