import { put, takeEvery, call, all } from 'redux-saga/effects'
import { Requester } from '../../services/requester/requester'

// USER ACTIONS
import { authUser, removeUserAuthData } from '../actionCreators/userDataActions'

// ACTION TYPES
import {
	CHECK_LOGIN_FAILED,
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
	LOGOUT_REQUESTED,
	CHECK_SESSION_REQUESTED,
	CHECK_SESSION_ENDED,
} from '../actionTypes/requestActionTypes'

export function* userLogin({ loginData }) {
	try {
		const responseData = yield call([Requester, 'send'], 'login', { body: loginData })

		if (!responseData.token) {
			throw new Error(responseData.message)
		}

		localStorage.setItem('token', responseData.token)
		localStorage.setItem('expiresIn', responseData.expiresIn)
		localStorage.setItem('secondaryToken', responseData.refreshToken)

		yield put(
			authUser({
				isAuth: true,
				data: {
					nickname: responseData.nickname,
					email: responseData.email,
				},
				isTokenExpired: false,
			}),
		)
		yield put({ type: CHECK_LOGIN_SUCCEEDED })
	} catch (error) {
		yield put({
			type: CHECK_LOGIN_FAILED,
		})
	}
}

export function* checkSession() {
	if (
		localStorage.getItem('token') &&
		localStorage.getItem('expiresIn') &&
		localStorage.getItem('secondaryToken')
	) {
		try {
			const responseData = yield call([Requester, 'send'], 'refreshTokens')

			if (!responseData.token) {
				throw new Error(responseData.message)
			}

			localStorage.setItem('token', responseData.token)
			localStorage.setItem('expiresIn', responseData.expiresIn)
			localStorage.setItem('secondaryToken', responseData.refreshToken)

			yield put(
				authUser({
					isAuth: true,
					data: {
						nickname: responseData.nickname,
						email: responseData.email,
					},
				}),
			)
		} catch (error) {
			localStorage.removeItem('token')
			localStorage.removeItem('expiresIn')
			localStorage.removeItem('secondaryToken')
		} finally {
			yield put({ type: CHECK_SESSION_ENDED })
		}
	} else {
		yield put({ type: CHECK_SESSION_ENDED })
	}
}

export function* userLogout() {
	try {
		yield call([Requester, 'send'], 'logout')
	} catch (error) {
		console.error('LOGOUT request failed')
	} finally {
		yield put(removeUserAuthData())

		localStorage.removeItem('token')
		localStorage.removeItem('expiresIn')
		localStorage.removeItem('secondaryToken')
	}
}

export function* watchForLoginRequests() {
	yield all([
		takeEvery(CHECK_LOGIN_REQUESTED, userLogin),
		takeEvery(CHECK_SESSION_REQUESTED, checkSession),
		takeEvery(LOGOUT_REQUESTED, userLogout),
	])
}
