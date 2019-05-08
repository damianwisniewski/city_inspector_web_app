import { put, takeEvery, call } from 'redux-saga/effects'
import { requester } from '../../services/requester/requester'

// USER ACTIONS
import { authUser } from '../actionCreators/userDataActions'

// ACTION TYPES
import {
	CHECK_LOGIN_FAILED,
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
	PASS_REMIND_FAILED,
	PASS_REMIND_REQUESTED,
	PASS_REMIND_SUCCEEDED,
} from '../actionTypes/requestActionTypes'

export function* userLogin({ loginData }) {
	try {
		const responseData = yield call(requester.post, 'login', loginData)
		yield put(authUser(responseData))
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

export function* passRemainder({ email }) {
	try {
		yield call(requester.post, 'remind_pass', email)
		yield put({ type: PASS_REMIND_SUCCEEDED })
	} catch (error) {
		yield put({
			type: PASS_REMIND_FAILED,
		})
	}
}
export function* watchForPassRemainder() {
	yield takeEvery(PASS_REMIND_REQUESTED, passRemainder)
}
