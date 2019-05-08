import { all } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

import { watchForLoginRequest } from './loginRequestSaga'
import { watchForPassRemainder } from './passReminderSaga'
import { watchForRegisterUser } from './registerRequestSaga'

export const sagaMiddleware = createSagaMiddleware()

export function* rootSaga() {
	yield all([watchForLoginRequest(), watchForPassRemainder(), watchForRegisterUser()])
}
