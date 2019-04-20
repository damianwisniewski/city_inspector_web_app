import { put, takeEvery, fork } from 'redux-saga/effects'
import { requester } from '../../services/requester/requester'

// USER ACTIONS
import { authUser } from '../actionCreators/userDataActions'

// ACTION TYPES
import {
	CHECK_LOGIN_FAILED,
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
} from '../actionTypes/requestActionTypes'

export function* userLogin({ email, password }) {
	try {
		const isUserAuth = yield fork(requester.post /* arguments */)

		yield put(authUser(isUserAuth))
		// TODO: if Auth true get user data
		// TODO: save user data in state

		yield put({ type: CHECK_LOGIN_SUCCEEDED })
	} catch (error) {
		yield put({
			type: CHECK_LOGIN_FAILED,
		})
	}
}
export function* watchForLoginRequest() {
	yield takeEvery(CHECK_LOGIN_REQUESTED, userLogin)
}
