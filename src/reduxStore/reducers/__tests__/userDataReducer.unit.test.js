import userDataReducer from '../userDataReducer'
import { SET_USER_AUTH } from '../../actionTypes/userDataActionTypes'

describe('userDataReducer', () => {
	it('should set value isUserAuth for action type - SET_USER_AUTH', () => {
		const initialState = {
			fakeValue: 'test',
			isUserAuth: false,
			anotherfakeValue: [],
		}
		const testAction = {
			type: SET_USER_AUTH,
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
