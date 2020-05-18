import * as React from 'react'

import { ITitle } from '../tsconf'

export default Title

function Title(props: ITitle): JSX.Element {
  return <h2 className="title">{props.text}</h2>
}
