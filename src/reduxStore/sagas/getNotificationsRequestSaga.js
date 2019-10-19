import { put, takeLatest, call } from 'redux-saga/effects'
import { Requester } from '../../services/requester/requester'

// USER ACTIONS
import { setNotifications } from '../actionCreators/notificationsActions'

// ACTION TYPES
import {
	GET_NOTIFICATIONS_REQUESTED,
	GET_NOTIFICATIONS_SUCCEEDED,
	GET_NOTIFICATIONS_FAILED,
} from '../actionTypes/requestActionTypes'

export function* getNotificationsSaga({ params }) {
	try {
		const responseData = yield call([Requester, 'send'], 'getAllNotification', { queries: params })
		yield put(setNotifications(responseData))
		yield put({ type: GET_NOTIFICATIONS_SUCCEEDED })
	} catch (error) {
		yield put({
			type: GET_NOTIFICATIONS_FAILED,
		})
	}
}

export function* watchForGetNotifications() {
	yield takeLatest(GET_NOTIFICATIONS_REQUESTED, getNotificationsSaga)
}
