import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// SAGAS
import { rootSaga, sagaMiddleware } from './sagas'
// REDUCERS
import reducers from './reducers'
// MIDDLEWARE
const middleware = [applyMiddleware(sagaMiddleware)]

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const store = createStore(reducers, composeEnhancers(...middleware))

sagaMiddleware.run(rootSaga)

export default store
