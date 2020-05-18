import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import Actions from '../redux/actions'

import { ISettings, IGameSettings, IState, IUpdateGameSetting } from '../tsconf'

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>) => ({
  updateSetting: (value: IUpdateGameSetting) => dispatch(Actions.Setting.updateSetting(value)),
})

const mapStateToProps = (state: IState) => ({
  Setting: state.Setting,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)

function Settings(
  props: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ISettings
): JSX.Element {
  const [values, setValues] = React.useState(props.Setting)

  function onSpeedChange(event: any): void {
    setValues(prev => {
      prev.speed = parseInt(event.target.value)
      return prev
    })
  }

  function onXSizeChange(event: any): void {
    setValues(prev => {
      prev.size.xLen = parseInt(event.target.value)
      return prev
    })
  }

  function onYSizeChange(event: any): void {
    setValues(prev => {
      prev.size.yLen = parseInt(event.target.value)
      return prev
    })
  }

  function updateSettings(event: React.MouseEvent): void {
    if (values.size.xLen < 100 && values.size.yLen < 100) {
      props.updateSetting({ key: 'size', value: values.size })
    } else if (values.speed > 99) {
      props.updateSetting({ key: 'speed', value: values.speed })
    }
  }

  return (
    <section className="settings">
      <div className="settings-row">
        <div className="settings-cell">
          <label className="settings-label">Speed</label>
          <input
            className="settings-input"
            type="number"
            placeholder="Enter Speed in MS"
            defaultValue={props.Setting.speed}
            name="speed"
            min="100"
            max="100000"
            step="100"
            onChange={onSpeedChange}
          />
        </div>
        <div className="settings-cell">
          <label className="settings-label">X Axis Size</label>
          <input
            className="settings-input"
            type="number"
            placeholder="X Axis size"
            defaultValue={props.Setting.size.xLen}
            name="xLen"
            min="10"
            max="80"
            step="1"
            onChange={onXSizeChange}
          />
        </div>
        <div className="settings-cell">
          <label className="settings-label">Y Axis Size</label>
          <input
            className="settings-input"
            type="number"
            placeholder="Y Axis size"
            defaultValue={props.Setting.size.yLen}
            name="yLen"
            min="10"
            max="80"
            step="1"
            onChange={onYSizeChange}
          />
        </div>
        <div className="setting-cell">
          <button
            type="button"
            className="btn btn-blue settings-action"
            onClick={updateSettings}
            disabled={true}
          >
            Update Settings
          </button>
        </div>
      </div>
    </section>
  )
}
