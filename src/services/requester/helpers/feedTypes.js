/**
 * Returns object width url fragments based on passed argument
 * @param {feedTypeUnion} feedType
 * @return {object}
 */
export const getFeedType = feedType => {
	let feedTarget = {}

	switch (feedType) {
		case 'login':
			feedTarget = {
				target: '/api/login/',
				params: '',
			}
			break

		default:
			feedTarget = {
				target: '',
				params: '',
			}
	}

	return feedTarget
}

/**
 * Union type for autocompletion of feedType in VSCode
 * @typedef
 * {(
 * 	| `login`
 * 	| `test`
 * 	| `another`
 * )}
 * feedTypeUnion
 */
