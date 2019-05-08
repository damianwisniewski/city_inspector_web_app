import { put, takeEvery, call } from 'redux-saga/effects'
import { requester } from '../../services/requester/requester'

// ACTION TYPES
import {
	PASS_REMIND_FAILED,
	PASS_REMIND_REQUESTED,
	PASS_REMIND_SUCCEEDED,
} from '../actionTypes/requestActionTypes'

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
