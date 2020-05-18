import { applyMiddleware, createStore, compose, CombinedState, StoreCreator } from 'redux'
import RootReducer from './reducers'
import ReduxThunk from 'redux-thunk'

import { IState } from '../tsconf'

const store = createStore(RootReducer, compose(applyMiddleware(ReduxThunk)))

export default store
