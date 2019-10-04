/**
 * Returns object width url fragments based on passed argument
 * @param {feedTypeUnion} feedType
 * @return {object}
 */
export const getFeedType = feedType => {
	let feedTarget = {}

	switch (feedType) {
		/**
		 * =============
		 * USERS
		 * =============
		 */

		case 'login':
			feedTarget = {
				method: 'POST',
				path: '/user/login/',
			}
			break

		case 'logout':
			feedTarget = {
				method: 'GET',
				path: '/user/logout/',
			}
			break

		case 'refreshTokens':
			feedTarget = {
				method: 'GET',
				path: '/user/refresh/',
			}
			break

		case 'initResetPassword':
			feedTarget = {
				method: 'POST',
				path: '/user/password/',
			}
			break

		case 'resetPassword':
			feedTarget = {
				method: 'PUT',
				path: '/user/password/',
			}
			break

		case 'registerUser':
			feedTarget = {
				method: 'POST',
				path: '/user/',
			}
			break

		case 'updateUserData':
			feedTarget = {
				method: 'PUT',
				path: '/user/',
			}
			break

		case 'deleteUser':
			feedTarget = {
				method: 'DELETE',
				path: '/user/',
			}
			break

		case 'getUserData':
			feedTarget = {
				method: 'GET',
				path: '/user/',
			}
			break

		/**
		 * =============
		 * NOTIFICATIONS
		 * =============
		 */

		case 'getAllNotification':
			feedTarget = {
				method: 'POST',
				path: '/subscription/all/',
			}
			break

		case 'getAllOwnNotification':
			feedTarget = {
				method: 'GET',
				path: '/notification/own/',
			}
			break

		case 'getSingleNotifiacation':
			feedTarget = {
				method: 'GET',
				path: '/notification/single/#{notificationId}/',
			}
			break

		case 'createNotification':
			feedTarget = {
				method: 'POST',
				path: '/notification/',
			}
			break

		case 'updateNotification':
			feedTarget = {
				method: 'PUT',
				path: '/notification/#{notificationId}/',
			}
			break

		case 'deleteNotification':
			feedTarget = {
				method: 'DELETE',
				path: '/notification/#{notificationId}/',
			}
			break

		/**
		 * =============
		 * SUBSCRIPTIONS
		 * =============
		 */

		case 'subscribeNotification':
			feedTarget = {
				method: 'POST',
				path: '/subscription/#{notificationId}/',
			}
			break

		case 'getAllSubscriptions':
			feedTarget = {
				method: 'GET',
				path: '/subscription/',
			}
			break

		case 'getSingleSubscription':
			feedTarget = {
				method: 'GET',
				path: '/subscription/#{subscriptionId}/',
			}
			break

		case 'deleteAllSubscriptions':
			feedTarget = {
				method: 'DELETE',
				path: '/subscription/',
			}
			break

		case 'deleteSingleSubscription':
			feedTarget = {
				method: 'DELETE',
				path: '/subscription/#{subscriptionId}/',
			}
			break

		/**
		 * =============
		 * COMMENTS
		 * =============
		 */

		case 'getAllComments':
			feedTarget = {
				method: 'POST',
				path: '/comment/#{notificationId}/all/',
			}
			break

		case 'getSingleComment':
			feedTarget = {
				method: 'GET',
				path: '/comment/#{notificationId}/single/#{commentId}/',
			}
			break

		case 'createNewComment':
			feedTarget = {
				method: 'GET',
				path: '/comment/#{notificationId}/',
			}
			break

		case 'deleteComment':
			feedTarget = {
				method: 'DELETE',
				path: '/comment/#{commentId}/',
			}
			break

		case 'updateComment':
			feedTarget = {
				method: 'DELETE',
				path: '/comment/#{commentId}/',
			}
			break

		default:
			feedTarget = {
				method: '',
				path: '',
			}
			break
	}

	return feedTarget
}

/**
 * Union type for autocompletion of feedType
 * @typedef
 * {(
 * | `login`
 * | `logout`
 * | `refreshTokens`
 * | `initResetPassword`
 * | `resetPassword`
 * | `registerUser`
 * | `updateUserData`
 * | `deleteUser`
 * | `getUserData`
 * | `getAllNotification`
 * | `getAllOwnNotification`
 * | `getSingleNotifiacation`
 * | `createNotification`
 * | `updateNotification`
 * | `deleteNotification`
 * | `subscribeNotification`
 * | `getAllSubscriptions`
 * | `getSingleSubscription`
 * | `deleteAllSubscriptions`
 * | `deleteSingleSubscription`
 * | `getAllComments`
 * | `getSingleComment`
 * | `createNewComment`
 * | `deleteComment`
 * | `updateComment`
 * )}
 * feedTypeUnion
 */
