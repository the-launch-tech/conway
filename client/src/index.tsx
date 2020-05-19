import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'

import store from './redux'
import Main from './Main'

import './assets/scss/_main.scss'

const wrapper: Element | null = document.getElementById('app')

window.addEventListener('load', () => {
  if (!!wrapper) {
    ReactDOM.render(
      <ReactRedux.Provider store={store}>
        <Main />
      </ReactRedux.Provider>,
      wrapper
    )
  }
})
