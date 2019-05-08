import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import withAuth from '../withAuth'

configure({ adapter: new Adapter() })

describe('withAuth() HOC', () => {
	const FakeComponent = withAuth(() => <div>TEST</div>)

	test('should render Component for authorized user', () => {
		const wrapper = shallow(<FakeComponent.WrappedComponent />)
		wrapper.setProps({ isUserAuth: true })
		expect(toJson(wrapper)).toMatchSnapshot()
	})

	test('should render Redirections for non-authorized user', () => {
		const wrapper = shallow(<FakeComponent.WrappedComponent />)
		wrapper.setProps({ isUserAuth: false })
		expect(toJson(wrapper)).toMatchSnapshot()
	})
})
