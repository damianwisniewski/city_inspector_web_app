import { all } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

import { watchForLoginRequests } from './loginRequestSaga'
import { watchForGetNotifications } from './getNotificationsRequestSaga'

export const sagaMiddleware = createSagaMiddleware()

export function* rootSaga() {
	yield all([watchForLoginRequests(), watchForGetNotifications()])
}
