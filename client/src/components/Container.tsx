import * as React from 'react'

import { IContainer } from '../tsconf'

export default Container

function Container(props: IContainer): JSX.Element {
  if (props.type === 'wrapper') {
    return (
      <div className={`container ${props.type} ${props.layout.join(' ')}`}>{props.children}</div>
    )
  } else if (props.type === 'content') {
    return (
      <main className={`container ${props.type} ${props.layout.join(' ')}`}>{props.children}</main>
    )
  }
  return <section className={`container ${props.layout.join(' ')}`}>{props.children}</section>
}
