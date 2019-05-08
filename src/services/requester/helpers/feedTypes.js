/**
 * Returns object width url fragments based on passed argument
 * @param {feedTypeUnion} feedType
 * @return {object}
 */
export const getFeedType = feedType => {
	const feedUrl = 'http://localhost:4000'
	let feedTarget = {}

	switch (feedType) {
		case 'login':
			feedTarget = {
				target: '/login/',
				params: '',
			}
			break

		case 'remind_pass':
			feedTarget = {
				target: '/remind/',
				params: '',
			}
			break

		case 'create_user':
			feedTarget = {
				target: '/register_user/',
				params: '',
			}
			break

		default:
			feedTarget = {
				target: '',
				params: '',
			}
	}

	return feedUrl + feedTarget.target + feedTarget.params
}

/**
 * Union type for autocompletion of feedType
 * @typedef
 * {(
 * 	| `login`
 * 	| `remind_pass`
 * 	| `create_user`
 * )}
 * feedTypeUnion
 */
