import * as React from 'react'

import ActionHandlers from './components/ActionHandlers'
import Settings from './components/Settings'
import Canvas from './canvas'

export default Main

function Main(props: {}): JSX.Element {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <h3 className="title">Conway's Game of Life</h3>
            <a
              className="instructions"
              href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
              target="_blank"
            >
              Playground Rules
            </a>
          </div>
          <Settings />
        </div>
      </header>
      <main className="container">
        <Canvas />
      </main>
      <footer className="footer">
        <ActionHandlers />
      </footer>
    </div>
  )
}
