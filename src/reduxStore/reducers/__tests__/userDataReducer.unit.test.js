import userDataReducer from '../userDataReducer'
import * as userActionTypes from '../../actionTypes/actionTypes'

describe('userDataReducer', () => {
	it('should set value isUserAuth for actionType - SET_USER_AUTH', () => {
		const initialState = {
			fakeValue: 'test',
			isUserAuth: false,
			anotherfakeValue: [],
		}
		const testAction = {
			type: userActionTypes.SET_USER_AUTH,
			isUserAuth: true,
		}

		const reducer = userDataReducer(initialState, testAction)

		expect(reducer).toEqual({
			fakeValue: 'test',
			isUserAuth: true,
			anotherfakeValue: [],
		})
	})
})
