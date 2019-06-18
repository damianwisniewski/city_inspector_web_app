import { SET_NOTIFICATIONS, CLEAR_NOTIFICATIONS } from '../actionTypes/notificationsActionTypes'

export function setNotifications(notifications) {
	return {
		type: SET_NOTIFICATIONS,
		notifications,
	}
}

export function clearNotifications() {
	return {
		type: CLEAR_NOTIFICATIONS,
	}
}
