import requestReducer from '../requestReducer'

import {
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
	CHECK_LOGIN_FAILED,
	CHECK_LOGIN_INITIAL,
	//
	PASS_REMIND_FAILED,
	PASS_REMIND_INITIAL,
	PASS_REMIND_REQUESTED,
	PASS_REMIND_SUCCEEDED,
	//
	REGISTER_FAILED,
	REGISTER_INITIAL,
	REGISTER_REQUESTED,
	REGISTER_SUCCEEDED,
} from '../../actionTypes/requestActionTypes'

describe('requestStateReducer', () => {
	describe('loginRequestStatus', () => {
		it('should set as "pending" for action type - CHECK_LOGIN_REQUESTED', () => {
			const initialState = {
				loginRequestStatus: 'initial',
			}
			const testAction = {
				type: CHECK_LOGIN_REQUESTED,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				loginRequestStatus: 'pending',
			})
		})

		it('should set as "succeeded" for action type - CHECK_LOGIN_SUCCEEDED', () => {
			const initialState = {
				loginRequestStatus: 'initial',
			}
			const testAction = {
				type: CHECK_LOGIN_SUCCEEDED,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				loginRequestStatus: 'succeeded',
			})
		})

		it('should set as "failed" for action type - CHECK_LOGIN_FAILED', () => {
			const initialState = {
				loginRequestStatus: 'initial',
			}
			const testAction = {
				type: CHECK_LOGIN_FAILED,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				loginRequestStatus: 'failed',
			})
		})

		it('should set as "initial" for action type - CHECK_LOGIN_INITIAL', () => {
			const initialState = {
				loginRequestStatus: 'failed',
			}
			const testAction = {
				type: CHECK_LOGIN_INITIAL,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				loginRequestStatus: 'initial',
			})
		})
	})

	describe('passReminderRequestStatus', () => {
		it('should set as "pending" for action type - PASS_REMIND_REQUESTED', () => {
			const initialState = {
				passReminderRequestStatus: 'initial',
			}
			const testAction = {
				type: PASS_REMIND_REQUESTED,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				passReminderRequestStatus: 'pending',
			})
		})

		it('should set as "succeeded" for action type - PASS_REMIND_SUCCEEDED', () => {
			const initialState = {
				passReminderRequestStatus: 'initial',
			}
			const testAction = {
				type: PASS_REMIND_SUCCEEDED,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				passReminderRequestStatus: 'succeeded',
			})
		})

		it('should set as "failed" for action type - PASS_REMIND_FAILED', () => {
			const initialState = {
				passReminderRequestStatus: 'initial',
			}
			const testAction = {
				type: PASS_REMIND_FAILED,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				passReminderRequestStatus: 'failed',
			})
		})

		it('should set as "initial" for action type - PASS_REMIND_INITIAL', () => {
			const initialState = {
				passReminderRequestStatus: 'failed',
			}
			const testAction = {
				type: PASS_REMIND_INITIAL,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				passReminderRequestStatus: 'initial',
			})
		})
	})

	describe('registerRequestStatus', () => {
		it('should set as "pending" for action type - REGISTER_REQUESTED', () => {
			const initialState = {
				registerRequestStatus: 'initial',
			}
			const testAction = {
				type: REGISTER_REQUESTED,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				registerRequestStatus: 'pending',
			})
		})

		it('should set as "succeeded" for action type - REGISTER_SUCCEEDED', () => {
			const initialState = {
				registerRequestStatus: 'initial',
			}
			const testAction = {
				type: REGISTER_SUCCEEDED,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				registerRequestStatus: 'succeeded',
			})
		})

		it('should set as "failed" for action type - REGISTER_FAILED', () => {
			const initialState = {
				registerRequestStatus: 'initial',
			}
			const testAction = {
				type: REGISTER_FAILED,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				registerRequestStatus: 'failed',
			})
		})

		it('should set as "initial" for action type - REGISTER_INITIAL', () => {
			const initialState = {
				registerRequestStatus: 'failed',
			}
			const testAction = {
				type: REGISTER_INITIAL,
			}

			const reducer = requestReducer(initialState, testAction)

			expect(reducer).toEqual({
				registerRequestStatus: 'initial',
			})
		})
	})
})
