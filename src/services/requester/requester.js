import { getFeedTemplate } from './feedTemplates'
import store from '../../reduxStore'
import { setTokenExpired } from '../../reduxStore/actionCreators/userDataActions'

/**
 * @typedef {import('../requester/feedTemplates').feedTypeUnion} feedTypeUnion
 * @typedef {Object<string, string>} requesterOptionsProp
 * @typedef {{params: requesterOptionsProp, queries: requesterOptionsProp, data: requesterOptionsProp}} requesterOptions
 */

export const Requester = {
	feedDomain: process.env.REACT_APP_FEED_DOMAIN,
	get tokenExpireTime() {
		return localStorage.getItem('expiresIn')
	},
	get token() {
		return localStorage.getItem('token')
	},
	get secondaryToken() {
		return localStorage.getItem('secondaryToken')
	},

	/**
	 * Check if token expired, in case it exist.
	 */
	get isTokenExpired() {
		if (this.tokenExpireTime && this.secondaryToken && this.tokenExpireTime) {
			return Number(this.tokenExpireTime) < Math.floor(Date.now() / 1000)
		}

		return false
	},

	/**
	 *
	 * @param {feedTypeUnion} feedType
	 * @param {requesterOptions} options
	 */
	send: async function(feedType, options = {}) {
		const { params, queries, body } = options
		const { method, pathTemplate, headersTemplate } = getFeedTemplate(feedType)

		if (feedType !== 'refreshTokens' && this.isTokenExpired) {
			await this.refreshToken()
		}

		const path = this.fillTemplateWithParams(pathTemplate, params)
		const query = queries ? this.objectToQueryString(queries) : ''
		const headers = this.prepareHeaders(headersTemplate)

		const response = await fetch(this.feedDomain + path + query, {
			method,
			body: body && JSON.stringify(body),
			headers,
		})

		if (response.status >= 400) {
			throw new Error(response.message)
		}

		const responseBody = response.status === 200 ? await response.json() : undefined

		return responseBody
	},

	/**
	 * Request for refresh tokens and replaces the old with new one
	 */
	refreshToken: function() {
		this.send('refreshTokens')
			.then(res => res.json())
			.then(res => {
				localStorage.setItem('token', res.token)
				localStorage.setItem('expiresIn', res.expiresIn)
				localStorage.setItem('secondaryToken', res.refreshToken)

				this.tokenExpireTime = res.expiresIn
				this.token = res.token
				this.secondaryToken = res.refreshToken
			})
			.catch(() => {
				localStorage.removeItem('token')
				localStorage.removeItem('expiresIn')
				localStorage.removeItem('secondaryToken')

				store.dispatch(
					setTokenExpired(
						'Pozostawałeś zbyt długo nieaktywy, dlatego twoja sesja wygasła. Zaloguj się ponownie',
					),
				)
			})
	},

	/**
	 * Parses passed object to query string
	 * @param {Object} data Object to parse to query string
	 * @returns {string} query string
	 */
	objectToQueryString: function(data) {
		let query = ''

		for (const key in data) {
			if (data[key].length) {
				// eslint-disable-next-line chai-friendly/no-unused-expressions
				!query ? (query += '?') : (query += '&')

				if (Array.isArray(data[key])) {
					query += `${key}=${data[key].join(`&${key}=`)}`
				} else {
					query += `${key}=${data[key]}`
				}
			}
		}

		return query
	},

	/**
	 * Fill path template with provided params
	 * @param {string} template path template
	 * @param {Object<string, string>} params object of params that should be placed in path template
	 * @returns {string} prepared path for request
	 */
	fillTemplateWithParams: function(template, params) {
		const regexer = /#{([\w\d]*)}/

		let processingTemplate = template
		let templateMatch = processingTemplate.match(regexer)

		while (templateMatch) {
			const param = params[templateMatch[1]]

			if (!param) {
				throw new Error(`You did not pass required param named "${templateMatch[1]}"`)
			}

			processingTemplate = processingTemplate.replace(templateMatch[0], param)
			templateMatch = processingTemplate.match(regexer)
		}

		return processingTemplate
	},

	/**
	 * Creates headers object for request
	 * @param {string[]} headersTemplates Array of headers templates
	 * @returns {Object<string, string>} Object of headers created from template array
	 */
	prepareHeaders: function(headersTemplates = []) {
		const headers = {
			'Content-Type': 'application/json',
		}

		headersTemplates.forEach(header => {
			switch (header) {
				case 'Authorization':
					headers['Authorization'] = `Bearer ${this.token}`
					break
				case 'Token-Refresh':
					headers['Token-Refresh'] = this.secondaryToken
					break
				case 'Form-Data':
					headers['Content-Type'] = 'multipart/form-data'
					break
				default:
					break
			}
		})

		return headers
	},
}
