import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import Actions from '../redux/actions'
import Button from './Button'
import Container from './Container'

import { IGameMemo, IState, IActionHandlers, IGameCoordinates } from '../tsconf'

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>) => ({
  toggleGameActive: (active: boolean) => dispatch(Actions.Game.toggleGameActive(active)),
  updateGameHistory: (history: IGameMemo[]) => dispatch(Actions.Game.updateGameHistory(history)),
  clearMemo: () => dispatch(Actions.Game.clearMemo()),
})

const mapStateToProps = (state: IState) => ({
  active: state.Game.active,
  size: state.Setting.size,
  history: state.Game.history,
  memo: state.Game.memo,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionHandlers)

function ActionHandlers(
  props: ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    IActionHandlers
): JSX.Element {
  const { active, size, history, memo } = props

  function onStartGame(event: React.MouseEvent): void {
    if (memo.size > 2) {
      props.toggleGameActive(true)
    }
  }

  function onStopGame(event: React.MouseEvent): void {
    props.toggleGameActive(false)
  }

  function onClearBoard(event: React.MouseEvent): void {
    if (active) {
      props.toggleGameActive(false)
    }
    props.clearMemo()
    props.updateGameHistory(history)
  }

  return (
    <Container type="block" layout={['flex-wrap', 'align-center', 'justify-center']}>
      <React.Fragment>
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
          onClick={onClearBoard}
          isDisabled={active || memo.size === 0}
          label="Clear"
          color="red"
        />
      </React.Fragment>
    </Container>
  )
}
