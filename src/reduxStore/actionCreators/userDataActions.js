import {
	SET_USER_AUTH,
	SET_TOKEN_EXPIRED,
	CLEAR_USER_AUTH_DATA,
	SET_COLLECTION_OF_SUBSCRIPTIONS,
} from '../actionTypes/userDataActionTypes'

export function authUser(userData) {
	return {
		type: SET_USER_AUTH,
		userData,
	}
}

export function removeUserAuthData() {
	return {
		type: CLEAR_USER_AUTH_DATA,
	}
}

export function setTokenExpired(message = '') {
	return {
		type: SET_TOKEN_EXPIRED,
		isTokenExpired: true,
		expireMessage: message,
	}
}

export function setCollectionOfSubscriptions(subscriptions) {
	return {
		type: SET_COLLECTION_OF_SUBSCRIPTIONS,
		subscriptions,
	}
}
