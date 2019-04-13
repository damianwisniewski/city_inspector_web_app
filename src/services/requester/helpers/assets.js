/**
 * Parses passed object to query string
 * @param {Object} body Object to parse to query string
 */
export const objectToQueryString = body => {
	let query = ''

	for (const key in body) {
		// eslint-disable-next-line chai-friendly/no-unused-expressions
		!query ? (query += '?') : (query += '&')
		query += `${key}=${body[key]}`
	}

	return query
}
