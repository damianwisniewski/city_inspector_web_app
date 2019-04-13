import { objectToQueryString } from './helpers/assets'
import { getFeedType, feedTypeUnion } from './helpers/feedTypes'

export const requester = {
	/**
	 *
	 * @param {feedTypeUnion} feedTyp
	 * @param {any} body
	 * @returns {Promise}
	 */
	get: (feedTyp, body = '') => {
		const fullUrl = feedTyp + objectToQueryString(body)

		return fetch(fullUrl, {
			method: 'GET',
		})
	},

	/**
	 *
	 * @param {string} feedType
	 * @param {any} body
	 * @returns {Promise}
	 */
	post: (feedType, body = '') => {
		return fetch(feedType, {
			method: 'POST',
			body: body,
		})
	},

	/**
	 *
	 * @param {string} feedType
	 * @param {any} body
	 * @returns {Promise}
	 */
	put: (feedType, body = '') => {
		return fetch(feedType, {
			method: 'POST',
			body: body,
		})
	},

	/**
	 *
	 * @param {string} feedType
	 * @param {any} body
	 * @returns {Promise}
	 */
	delete: (feedType, body = '') => {
		return fetch(feedType, {
			method: 'POST',
			body: body,
		})
	},
}

requester.get()
