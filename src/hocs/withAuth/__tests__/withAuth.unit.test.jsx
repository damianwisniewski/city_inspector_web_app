import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import withAuth from '../withAuth'
import { isUserAuth } from '../../../reduxStore/reducers/userDataReducer'

configure({ adapter: new Adapter() })

jest.mock('../../../reduxStore/reducers/userDataReducer')

describe('withAuth() HOC', () => {
	const FakeComponent = withAuth(() => <div>TEST</div>)

	afterEach(() => {
		isUserAuth.mockClear()
	})

	test('should call isUserAuth to check is user authorized', () => {
		shallow(<FakeComponent />)
		expect(isUserAuth).toBeCalled()
	})

	test('should render Component for authorized user', () => {
		isUserAuth.mockReturnValue(true)
		const wrapper = shallow(<FakeComponent />)
		expect(toJson(wrapper)).toMatchSnapshot()
	})

	test('should render Redirections for non-authorized user', () => {
		isUserAuth.mockReturnValue(false)
		const wrapper = shallow(<FakeComponent />)
		expect(toJson(wrapper)).toMatchSnapshot()
	})
})
