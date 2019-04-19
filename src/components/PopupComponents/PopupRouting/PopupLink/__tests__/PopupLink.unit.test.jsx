import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import PopupLink from '../PopupLink'

configure({ adapter: new Adapter() })

describe('<PopupLink />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let PopupLinkComponent
	const textContent = 'Example text'
	const to = 'FakePopup'
	const activeClassName = 'FakeCssClass'
	const className = 'FakeCssClass_2'

	test('should render correctly', () => {
		PopupLinkComponent = shallow(
			<PopupLink to={to} activeClassName={activeClassName} className={className}>
				{textContent}
			</PopupLink>,
		)

		expect(toJson(PopupLinkComponent)).toMatchSnapshot()
	})

	//TODO: tests related to context
})
