import React from 'react'
import NavItem from '../NavItem'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

describe('<NavItem />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let NavItemComponent
	const NavItemText = 'ExampleText'
	const location = '/'
	const icon = 'test'
	const linkType = 'link'
	const buttonType = 'button'

	test('should render correctly NavItem type BUTTOM', () => {
		NavItemComponent = shallow(
			<NavItem icon={icon} type={buttonType} to={location}>
				{NavItemText}
			</NavItem>,
		)
		expect(toJson(NavItemComponent)).toMatchSnapshot()
	})

	test('should render correctly NavItem type LINK', () => {
		NavItemComponent = shallow(
			<NavItem icon={icon} type={linkType} to={location}>
				{NavItemText}
			</NavItem>,
		)

		expect(toJson(NavItemComponent)).toMatchSnapshot()
	})
})
