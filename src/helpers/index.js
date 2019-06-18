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
