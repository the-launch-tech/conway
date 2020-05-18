import * as React from 'react'

import { IRow } from '../tsconf'

export default Row

function Row(props: IRow): JSX.Element {
  return <div className="row">{props.cells}</div>
}
