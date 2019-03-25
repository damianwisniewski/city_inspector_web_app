import { SET_USER_AUTH } from '../actionTypes/actionTypes'

const initialState = {
	isUserAuth: false,
}

const userDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_AUTH:
			return {
				...state,
				isUserAuth: action.isUserAuth,
			}
		default:
			return state
	}
}

export default userDataReducer
