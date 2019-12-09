import {
	SET_USER_AUTH,
	SET_TOKEN_EXPIRED,
	CLEAR_USER_AUTH_DATA,
	SET_COLLECTION_OF_SUBSCRIPTIONS,
} from '../actionTypes/userDataActionTypes'

const initialState = {
	isUserAuth: false,
	data: {
		nickname: '',
		email: '',
	},
	isTokenExpired: false,
	expireMessage: '',
	collectionOfSubscriptions: [],
}

const userDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_AUTH:
			return {
				...state,
				isUserAuth: action.userData.isAuth,
				data: action.userData.data,
			}
		case SET_TOKEN_EXPIRED:
			return {
				...state,
				isTokenExpired: action.isTokenExpired,
				isUserAuth: false,
				expireMessage: action.expireMessage,
			}
		case CLEAR_USER_AUTH_DATA:
			return {
				...initialState,
			}

		case SET_COLLECTION_OF_SUBSCRIPTIONS:
			return {
				...state,
				collectionOfSubscriptions: action.subscriptions,
			}
		default:
			return state
	}
}

export default userDataReducer
