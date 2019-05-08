import { objectToQueryString } from './helpers/assets'
import { getFeedType } from './helpers/feedTypes'

export const requester = {
	/**
	 *
	 * @param {import('./helpers/feedTypes').feedTypeUnion} feedTyp
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

requester.get()
