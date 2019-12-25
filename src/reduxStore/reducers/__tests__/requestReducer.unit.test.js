import requestReducer from '../requestReducer'

import {
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
	CHECK_LOGIN_FAILED,
	CHECK_LOGIN_INITIAL,
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
})
