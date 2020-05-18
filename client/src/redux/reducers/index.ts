import { combineReducers } from 'redux'

import Setting from './Setting'
import Game from './Game'

import { IState } from '../../tsconf'

export default combineReducers<IState>({
  Setting,
  Game,
})
