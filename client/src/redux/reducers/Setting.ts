import Types from '../types/index'
import merge from '../merge'
import initialState from '../initialState'

import { IAction, IState, ISettingState } from '../../tsconf'

const { log, error } = console

export default (state: ISettingState = initialState.Setting, action: IAction) => {
  switch (action.type) {
    case Types.Setting.UPDATE_SETTING:
      return updateSetting(state, action.payload)
    default:
      return state
  }
}

const updateSetting = (state: ISettingState, payload: IAction['payload']): ISettingState => {
  const newState: any = {}
  newState[payload.key] = payload.value
  return merge.Setting(state, newState)
}
