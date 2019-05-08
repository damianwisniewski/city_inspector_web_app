import userDataReducer from '../userDataReducer'
import { SET_USER_AUTH } from '../../actionTypes/userDataActionTypes'

describe('userDataReducer', () => {
	it('should set value isUserAuth and data for action type - SET_USER_AUTH', () => {
		const initialState = {
			isUserAuth: false,
			data: {
				nickname: '',
				email: '',
			},
		}
		const testAction = {
			type: SET_USER_AUTH,
			userData: {
				isAuth: true,
				data: {
					nickname: 'fake_nickname',
					email: 'fake_email',
				},
			},
		}

		const reducer = userDataReducer(initialState, testAction)

		expect(reducer).toEqual({
			isUserAuth: true,
			data: {
				nickname: 'fake_nickname',
				email: 'fake_email',
			},
		})
	})
})
