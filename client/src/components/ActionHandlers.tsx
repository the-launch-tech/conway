import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import Actions from '../redux/actions'
import Button from './Button'

import { IGameMemo, IState } from '../tsconf'

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>) => ({
  toggleGameActive: (active: boolean) => dispatch(Actions.Game.toggleGameActive(active)),
  updateGameHistory: (history: IGameMemo[]) => dispatch(Actions.Game.updateGameHistory(history)),
  clearMemo: () => dispatch(Actions.Game.clearMemo()),
  clearHistory: () => dispatch(Actions.Game.clearHistory()),
})

const mapStateToProps = (state: IState) => ({
  active: state.Game.active,
  history: state.Game.history,
  memo: state.Game.memo,
  speed: state.Setting.speed,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionHandlers)

function ActionHandlers(
  props: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
): JSX.Element {
  const { active, history, memo, speed } = props

  function onStartGame(event: React.MouseEvent): void {
    props.toggleGameActive(true)
  }

  function onStopGame(event: React.MouseEvent): void {
    props.toggleGameActive(false)
  }

  function onClearAndSave(event?: React.MouseEvent): void {
    props.updateGameHistory(history)
    props.clearMemo()
    props.clearHistory()
  }

  return (
    <div className="footer-container">
      <Button
        classes={['run-action']}
        onClick={onStartGame}
        isDisabled={active || memo.size < 3}
        label="Run Game of Life"
        color="green"
      />
      <Button
        classes={['stop-action']}
        onClick={onStopGame}
        isDisabled={!active}
        label="Stop"
        color="orange"
      />
      <Button
        classes={['clear-action']}
        onClick={onClearAndSave}
        isDisabled={active || memo.size === 0}
        label="Clear"
        color="red"
      />
    </div>
  )
}
