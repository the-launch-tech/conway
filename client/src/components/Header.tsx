import * as React from 'react'

import { IHeader } from '../tsconf'

export default Header

function Header(props: IHeader): JSX.Element {
  return <header className="header">{props.children}</header>
}
