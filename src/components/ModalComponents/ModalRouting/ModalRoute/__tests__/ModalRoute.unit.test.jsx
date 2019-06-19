import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import ModalRoute from '../ModalRoute'

configure({ adapter: new Adapter() })

describe('<ModalRoute />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let ModalRouteComponent
	const MockComponent = () => <p>mock</p>

	test('should render correctly', () => {
		ModalRouteComponent = shallow(<ModalRoute component={MockComponent} />)

		expect(toJson(ModalRouteComponent)).toMatchSnapshot()
	})

	test('should provide darkOverlay and closeButton to Modal', () => {
		ModalRouteComponent = shallow(<ModalRoute component={MockComponent} closeButton darkOverlay />)
		expect(ModalRouteComponent.find('Modal').props()).toMatchObject({
			closeButton: true,
			darkOverlay: true,
		})
	})

	//TODO: tests related to context
})
