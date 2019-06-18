import { SET_NOTIFICATIONS, CLEAR_NOTIFICATIONS } from '../actionTypes/notificationsActionTypes'

const initialState = {
	notifications: [],
}

const notificationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NOTIFICATIONS:
			return {
				...state,
				notifications: action.notifications,
			}
		case CLEAR_NOTIFICATIONS:
			return {
				...state,
				notifications: [],
			}
		default:
			return state
	}
}

export default notificationsReducer
