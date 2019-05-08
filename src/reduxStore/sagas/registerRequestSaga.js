import { put, takeEvery, call } from 'redux-saga/effects'
import { requester } from '../../services/requester/requester'

// ACTION TYPES
import {
	REGISTER_FAILED,
	REGISTER_REQUESTED,
	REGISTER_SUCCEEDED,
} from '../actionTypes/requestActionTypes'

export function* registerUser({ userData }) {
	try {
		yield call(requester.put, 'create_user', userData)
		yield put({ type: REGISTER_SUCCEEDED })
	} catch (error) {
		yield put({
			type: REGISTER_FAILED,
		})
	}
}
export function* watchForRegisterUser() {
	yield takeEvery(REGISTER_REQUESTED, registerUser)
}
