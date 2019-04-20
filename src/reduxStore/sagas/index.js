import { all } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

import { watchForLoginRequest } from './loginRequestSaga'

export const sagaMiddleware = createSagaMiddleware()

export function* rootSaga() {
	yield all([watchForLoginRequest()])
}
