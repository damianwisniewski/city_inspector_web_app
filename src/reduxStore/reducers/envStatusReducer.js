import { SET_IS_MOBILE } from '../actionTypes/envStatusActionTypes'

const initialState = {
	isMobile: false,
}

const envStatusReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_IS_MOBILE:
			return {
				...state,
				isMobile: action.isMobile,
			}
		default:
			return state
	}
}

export default envStatusReducer
