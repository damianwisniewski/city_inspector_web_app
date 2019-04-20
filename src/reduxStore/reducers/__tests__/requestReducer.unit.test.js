import requestReducer from '../requestReducer'

import {
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
	CHECK_LOGIN_FAILED,
} from '../../actionTypes/requestActionTypes'

describe('requestStateReducer', () => {
	it('should set loginCheckRequest as "pending" for action type - CHECK_LOGIN_REQUESTED', () => {
		const initialState = {
			loginCheckRequest: 'initial',
		}
		const testAction = {
			type: CHECK_LOGIN_REQUESTED,
		}

		const reducer = requestReducer(initialState, testAction)

		expect(reducer).toEqual({
			loginCheckRequest: 'pending',
		})
	})

	it('should set loginCheckRequest as "succeeded" for action type - CHECK_LOGIN_SUCCEEDED', () => {
		const initialState = {
			loginCheckRequest: 'initial',
		}
		const testAction = {
			type: CHECK_LOGIN_SUCCEEDED,
		}

		const reducer = requestReducer(initialState, testAction)

		expect(reducer).toEqual({
			loginCheckRequest: 'succeeded',
		})
	})

	it('should set loginCheckRequest as "failed" for action type - CHECK_LOGIN_FAILED', () => {
		const initialState = {
			loginCheckRequest: 'initial',
		}
		const testAction = {
			type: CHECK_LOGIN_FAILED,
		}

		const reducer = requestReducer(initialState, testAction)

		expect(reducer).toEqual({
			loginCheckRequest: 'failed',
		})
	})
})
