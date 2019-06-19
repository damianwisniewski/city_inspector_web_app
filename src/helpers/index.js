export const debounce = (callback, time) => {
	let timeout = null

	return (...args) => {
		const next = () => callback(...args)

		clearTimeout(timeout)
		timeout = setTimeout(next, time)
	}
}

export const checkPropertiesEquality = ([a, b], values) => {
	for (let i = 0; i < values.length; i++) {
		if (a[values[i]] !== b[values[i]]) {
			return false
		}
	}

	return true
}

export const translateParams = param => {
	const paramsTranslations = {
		dangerous: encodeURIComponent('niebezpieczne miejsca'),
		damage: encodeURIComponent('uszkodzenia'),
		nature: encodeURIComponent('zaniedbana zieleń'),
		trashes: encodeURIComponent('zanieczyszczona przestrzeń'),
	}

	if (Array.isArray(param)) {
		return param.map(param => paramsTranslations[param] || param)
	}

	return paramsTranslations[param] || param
}

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
