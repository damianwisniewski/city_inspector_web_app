/**
 * Parses passed object to query string
 * @param {Object} body Object to parse to query string
 */
export const objectToQueryString = body => {
	let query = ''

	for (const key in body) {
		if (body[key].length) {
			// eslint-disable-next-line chai-friendly/no-unused-expressions
			!query ? (query += '?') : (query += '&')

			if (Array.isArray(body[key])) {
				query += `${key}=${body[key].join(`&${key}=`)}`
			} else {
				query += `${key}=${body[key]}`
			}
		}
	}

	return query
}
