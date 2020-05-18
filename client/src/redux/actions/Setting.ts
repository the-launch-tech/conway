import Types from '../types'

import { IAction, IUpdateGameSetting } from '../../tsconf'

export function updateSetting(payload: IUpdateGameSetting): IAction {
  return {
    type: Types.Setting.UPDATE_SETTING,
    payload,
  }
}
