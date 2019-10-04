import { objectToQueryString } from '../../helpers/index'
import { getFeedType } from './feedTypes'
export const requester = {
	/**
	 *
	 * @param {import('./helpers/feedTypes').feedTypeUnion} feedType
	 * @param {any} body
	 * @returns {Promise}
	 */
	get: (feedType, body = '') => {
		const fullUrl = getFeedType(feedType) + objectToQueryString(body)

		return fetch(fullUrl, {
			method: 'GET',
		})
			.then(res => (res.status === 204 ? res.status : res.json()))
			.catch(err => {
				throw new Error(err)
			})
	},

	/**
	 *
	 * @param {import('./helpers/feedTypes').feedTypeUnion} feedType
	 * @param {any} body
	 * @returns {Promise}
	 */
	post: (feedType, body = '') => {
		return fetch(getFeedType(feedType), {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => (res.status === 204 ? res.status : res.json()))
			.catch(err => {
				throw new Error(err)
			})
	},

	/**
	 *
	 * @param {import('./helpers/feedTypes').feedTypeUnion} feedType
	 * @param {any} body
	 * @returns {Promise}
	 */
	put: (feedType, body = '') => {
		return fetch(getFeedType(feedType), {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => (res.status === 204 ? res.status : res.json()))
			.catch(err => {
				throw new Error(err)
			})
	},

	/**
	 *
	 * @param {import('./helpers/feedTypes').feedTypeUnion} feedType
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

/**
 *
 * @param {*} feedType
 * @param {*} options
 */
const request = (feedType, options = {}) => {
	const { params, data } = options
	const requestDetails = getFeedType(feedType)

	fetch(requestDetails, {
		method: requestDetails.method,
		body: options.body,
	})
}
