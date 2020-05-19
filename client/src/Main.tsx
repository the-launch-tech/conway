import * as React from 'react'

import ActionHandlers from './components/ActionHandlers'
import Settings from './components/Settings'
import Header from './components/Header'
import Title from './components/Title'
import Container from './components/Container'
import Canvas from './canvas'

export default Main

function Main(props: {}): JSX.Element {
  return (
    <Container type="wrapper" layout={['flex-column', 'justify-center', 'align-center']}>
      <React.Fragment>
        <Header>
          <Title text="Conway's Game of Life" />
        </Header>
        <Container type="content" layout={['flex', 'flex-wrap', 'justify-between', 'align-start']}>
          <React.Fragment>
            <Container
              type="pane"
              layout={['flex-column', 'align-start', 'justify-start']}
              flexWidth={70}
            >
              <React.Fragment>
                <Settings />
                <Canvas />
                <ActionHandlers />
              </React.Fragment>
            </Container>
            <Container type="pane" layout={['align-start']} flexWidth={30}>
              <div></div>
            </Container>
          </React.Fragment>
        </Container>
      </React.Fragment>
    </Container>
  )
}
