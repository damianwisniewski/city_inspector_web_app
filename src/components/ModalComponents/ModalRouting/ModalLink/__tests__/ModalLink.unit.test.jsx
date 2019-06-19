import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import ModalLink from '../ModalLink'

configure({ adapter: new Adapter() })

describe('<ModalLink />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let ModalLinkComponent
	const textContent = 'Example text'
	const to = 'FakeModal'
	const activeClassName = 'FakeCssClass'
	const className = 'FakeCssClass_2'

	test('should render correctly', () => {
		ModalLinkComponent = shallow(
			<ModalLink to={to} activeClassName={activeClassName} className={className}>
				{textContent}
			</ModalLink>,
		)

		expect(toJson(ModalLinkComponent)).toMatchSnapshot()
	})

	//TODO: tests related to context
})
