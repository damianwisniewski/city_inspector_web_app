import { all } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

import { watchForLoginRequest } from './loginRequestSaga'
import { watchForGetNotifications } from './getNotificationsRequestSaga'

export const sagaMiddleware = createSagaMiddleware()

export function* rootSaga() {
	yield all([watchForLoginRequest(), watchForGetNotifications()])
}
