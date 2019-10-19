/**
 * Returns object width url fragments based on passed argument
 * @param {feedTypeUnion} feedType
 * @return {object}
 */
export const getFeedTemplate = feedType => {
	let feedTemplate = {}

	switch (feedType) {
		/**
		 * =============
		 * USERS
		 * =============
		 */

		case 'login':
			feedTemplate = {
				method: 'POST',
				pathTemplate: '/user/login',
			}
			break

		case 'logout':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/user/logout',
				headersTemplate: ['Token-Refresh', 'Authorization'],
			}
			break

		case 'refreshTokens':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/user/refresh',
				headersTemplate: ['Token-Refresh', 'Authorization'],
			}
			break

		case 'initResetPassword':
			feedTemplate = {
				method: 'POST',
				pathTemplate: '/user/password',
			}
			break

		case 'resetPassword':
			feedTemplate = {
				method: 'PUT',
				pathTemplate: '/user/password',
			}
			break

		case 'registerUser':
			feedTemplate = {
				method: 'POST',
				pathTemplate: '/user',
			}
			break

		case 'updateUserData':
			feedTemplate = {
				method: 'PUT',
				pathTemplate: '/user',
				headersTemplate: ['Authorization'],
			}
			break

		case 'deleteUser':
			feedTemplate = {
				method: 'DELETE',
				pathTemplate: '/user',
				headersTemplate: ['Authorization'],
			}
			break

		case 'getUserData':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/user',
				headersTemplate: ['Authorization'],
			}
			break

		/**
		 * =============
		 * NOTIFICATIONS
		 * =============
		 */

		case 'getAllNotification':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/notification/all',
			}
			break

		case 'getAllOwnNotification':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/notification/own',
				headersTemplate: ['Authorization'],
			}
			break

		case 'getSingleNotifiacation':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/notification/single/#{notificationId}',
			}
			break

		case 'createNotification':
			feedTemplate = {
				method: 'POST',
				pathTemplate: '/notification',
				headersTemplate: ['Authorization', 'Form-Data'],
			}
			break

		case 'updateNotification':
			feedTemplate = {
				method: 'PUT',
				pathTemplate: '/notification/#{notificationId}',
				headersTemplate: ['Authorization', 'Form-Data'],
			}
			break

		case 'deleteNotification':
			feedTemplate = {
				method: 'DELETE',
				pathTemplate: '/notification/#{notificationId}',
				headersTemplate: ['Authorization'],
			}
			break

		/**
		 * =============
		 * SUBSCRIPTIONS
		 * =============
		 */

		case 'subscribeNotification':
			feedTemplate = {
				method: 'POST',
				pathTemplate: '/subscription/#{notificationId}',
				headersTemplate: ['Authorization'],
			}
			break

		case 'getAllSubscriptions':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/subscription',
				headersTemplate: ['Authorization'],
			}
			break

		case 'getSingleSubscription':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/subscription/#{subscriptionId}',
				headersTemplate: ['Authorization'],
			}
			break

		case 'deleteAllSubscriptions':
			feedTemplate = {
				method: 'DELETE',
				pathTemplate: '/subscription',
				headersTemplate: ['Authorization'],
			}
			break

		case 'deleteSingleSubscription':
			feedTemplate = {
				method: 'DELETE',
				pathTemplate: '/subscription/#{subscriptionId}',
				headersTemplate: ['Authorization'],
			}
			break

		/**
		 * =============
		 * COMMENTS
		 * =============
		 */

		case 'getAllComments':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/comment/#{notificationId}/all',
			}
			break

		case 'getSingleComment':
			feedTemplate = {
				method: 'GET',
				pathTemplate: '/comment/#{notificationId}/single/#{commentId}',
			}
			break

		case 'createNewComment':
			feedTemplate = {
				method: 'POST',
				pathTemplate: '/comment/#{notificationId}',
				headersTemplate: ['Authorization'],
			}
			break

		case 'deleteComment':
			feedTemplate = {
				method: 'DELETE',
				pathTemplate: '/comment/#{commentId}',
				headersTemplate: ['Authorization'],
			}
			break

		case 'updateComment':
			feedTemplate = {
				method: 'PUT',
				pathTemplate: '/comment/#{commentId}',
				headersTemplate: ['Authorization'],
			}
			break

		default:
			feedTemplate = {
				method: '',
				pathTemplate: '',
			}
			break
	}

	return feedTemplate
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
