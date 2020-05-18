import * as React from 'react'

import { IButton } from '../tsconf'

export default Button

function Button(props: IButton): JSX.Element {
  return (
    <button
      className={`btn btn-${props.color} ${props.classes.join(' ')}`}
      onClick={props.onClick}
      disabled={props.isDisabled}
    >
      {props.label}
    </button>
  )
}
