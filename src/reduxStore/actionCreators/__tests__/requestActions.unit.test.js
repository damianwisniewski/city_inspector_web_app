import {
	sagaRequestLogin,
	resetLoginRequestStatus,
	sagaPassRemind,
	resetPassRemindRequestStatus,
	resetRequestRegisterStatus,
	sagaRequestRegister,
} from '../requestActions'

import {
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_INITIAL,
	PASS_REMIND_REQUESTED,
	PASS_REMIND_INITIAL,
	REGISTER_INITIAL,
	REGISTER_REQUESTED,
} from '../../actionTypes/requestActionTypes'

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

	it('sagaPassRemind should pass type PASS_REMIND_REQUESTED and email', () => {
		const payload = 'email@email.org'
		const action = sagaPassRemind(payload)

		expect(action).toEqual({
			type: PASS_REMIND_REQUESTED,
			email: payload,
		})
	})

	it('resetPassRemindRequestStatus should pass type PASS_REMIND_INITIAL', () => {
		const action = resetPassRemindRequestStatus()

		expect(action).toEqual({
			type: PASS_REMIND_INITIAL,
		})
	})

	it('sagaRequestRegister should pass type REGISTER_REQUESTED and userData', () => {
		const payload = { test: 'mock', test2: 'mock2' }
		const action = sagaRequestRegister(payload)

		expect(action).toEqual({
			type: REGISTER_REQUESTED,
			userData: payload,
		})
	})

	it('resetRequestRegisterStatus should pass type REGISTER_INITIAL', () => {
		const action = resetRequestRegisterStatus()

		expect(action).toEqual({
			type: REGISTER_INITIAL,
		})
	})
})
