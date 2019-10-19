import {
	SET_USER_AUTH,
	SET_TOKEN_EXPIRED,
	CLEAR_USER_AUTH_DATA,
} from '../actionTypes/userDataActionTypes'

const initialState = {
	isUserAuth: false,
	data: {
		nickname: '',
		email: '',
	},
	isTokenExpired: false,
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
			}
		case CLEAR_USER_AUTH_DATA:
			return {
				isUserAuth: false,
				data: {
					nickname: '',
					email: '',
				},
				isTokenExpired: false,
			}
		default:
			return state
	}
}

export default userDataReducer
