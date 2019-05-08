import { SET_USER_AUTH } from '../actionTypes/userDataActionTypes'

const initialState = {
	isUserAuth: false,
	data: {
		nickname: '',
		email: '',
	},
}

const userDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_AUTH:
			return {
				...state,
				isUserAuth: action.userData.isAuth,
				data: action.userData.data,
			}
		default:
			return state
	}
}

export default userDataReducer
