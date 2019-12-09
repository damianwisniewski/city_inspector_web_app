import { put, takeEvery, call, all } from 'redux-saga/effects'
import { Requester } from '../../services/requester/requester'

// USER ACTIONS
import {
	authUser,
	removeUserAuthData,
	setCollectionOfSubscriptions,
} from '../actionCreators/userDataActions'

// ACTION TYPES
import {
	CHECK_LOGIN_FAILED,
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
	LOGOUT_REQUESTED,
	CHECK_SESSION_REQUESTED,
	CHECK_SESSION_ENDED,
	GET_SUBSCRIPTIONS_REQUESTED,
	GET_SUBSCRIPTIONS_SUCCEEDED,
	GET_SUBSCRIPTIONS_FAILED,
} from '../actionTypes/requestActionTypes'

/**
 * Saves user subscriptions in redux state
 */
export function* getSubscriptionCollection() {
	try {
		const subscriptions = yield call([Requester, 'send'], 'getAllSubscriptions')
		yield put(setCollectionOfSubscriptions(subscriptions))
		yield put({ type: GET_SUBSCRIPTIONS_SUCCEEDED })
	} catch (error) {
		yield put({
			type: GET_SUBSCRIPTIONS_FAILED,
		})
	}
}

/**
 * Sends user auth data to request for login
 * Sets tokens and expire time on localStorage
 * Sets information of authorization and user notification and subscriptions in redux store
 */
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
		yield put({ type: GET_SUBSCRIPTIONS_REQUESTED })
	} catch (error) {
		yield put({
			type: CHECK_LOGIN_FAILED,
		})
	}
}

/**
 * Refreshes user session.
 * Sets tokens and expire time on localStorage
 * Sets information of authorization and user notification and subscriptions in redux store
 */
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
			yield put({ type: GET_SUBSCRIPTIONS_REQUESTED })
		}
	} else {
		yield put({ type: CHECK_SESSION_ENDED })
	}
}

/**
 * Logout user
 * Clears user auth data
 */
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

/**
 * Watcher for all action types
 */
export function* watchForLoginRequests() {
	yield all([
		takeEvery(GET_SUBSCRIPTIONS_REQUESTED, getSubscriptionCollection),
		takeEvery(CHECK_LOGIN_REQUESTED, userLogin),
		takeEvery(CHECK_SESSION_REQUESTED, checkSession),
		takeEvery(LOGOUT_REQUESTED, userLogout),
	])
}
