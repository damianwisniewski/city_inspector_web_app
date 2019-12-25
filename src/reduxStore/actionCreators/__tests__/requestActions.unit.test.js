import { sagaRequestLogin, resetLoginRequestStatus } from '../requestActions'

import { CHECK_LOGIN_REQUESTED, CHECK_LOGIN_INITIAL } from '../../actionTypes/requestActionTypes'

describe('Request actions', () => {
	it('sagaRequestLogin should pass type CHECK_LOGIN_REQUESTED and loginData', () => {
		const payload = { test: 'mock', test2: 'mock2' }
		const action = sagaRequestLogin(payload)

		expect(action).toEqual({
			type: CHECK_LOGIN_REQUESTED,
			loginData: payload,
		})
	})

	it('resetLoginRequestStatus should pass type CHECK_LOGIN_INITIAL', () => {
		const action = resetLoginRequestStatus()

		expect(action).toEqual({
			type: CHECK_LOGIN_INITIAL,
		})
	})
})
