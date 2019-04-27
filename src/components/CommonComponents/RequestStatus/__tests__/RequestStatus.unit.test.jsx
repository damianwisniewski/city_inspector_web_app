import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import RequestStatus from '../RequestStatus'

configure({ adapter: new Adapter() })

describe('<RequestStatus />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let RequestStatusElement
	const id = 'FakeID'
	const children = (
		<div>
			<p>Test</p>
		</div>
	)
	const errorMessage = 'Fake error message'

	test('should render correctly RequestStatus with requestState pending', () => {
		RequestStatusElement = shallow(
			<RequestStatus id={id} requestState='pending' errorMessage={errorMessage}>
				{children}
			</RequestStatus>,
		)
		expect(toJson(RequestStatusElement)).toMatchSnapshot()
	})

	test('should render correctly RequestStatus with requestState failed', () => {
		RequestStatusElement = shallow(
			<RequestStatus id={id} requestState='failed' errorMessage={errorMessage}>
				{children}
			</RequestStatus>,
		)
		expect(toJson(RequestStatusElement)).toMatchSnapshot()
	})

	test('should render correctly RequestStatus with requestState succeeded', () => {
		RequestStatusElement = shallow(
			<RequestStatus id={id} requestState='succeeded' errorMessage={errorMessage}>
				{children}
			</RequestStatus>,
		)
		expect(toJson(RequestStatusElement)).toMatchSnapshot()
	})

	test('should render correctly RequestStatus with direction horizontal', () => {
		RequestStatusElement = shallow(
			<RequestStatus
				id={id}
				requestState='initial'
				direction='horizontal'
				errorMessage={errorMessage}
			>
				{children}
			</RequestStatus>,
		)
		expect(toJson(RequestStatusElement)).toMatchSnapshot()
	})

	test('should render correctly RequestStatus with direction vertical', () => {
		RequestStatusElement = shallow(
			<RequestStatus
				id={id}
				requestState='initial'
				direction='vertical'
				errorMessage={errorMessage}
			>
				{children}
			</RequestStatus>,
		)
		expect(toJson(RequestStatusElement)).toMatchSnapshot()
	})
})
