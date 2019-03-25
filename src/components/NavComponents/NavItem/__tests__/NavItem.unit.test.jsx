import React from 'react'
import NavItem from '../NavItem'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<NavItem />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let NavItemComponent
	const NavItemText = 'ExampleText'
	const location = '/'
	const linkType = 'link'
	const buttonType = 'button'
	const onClickFunc = jest.fn()

	test('should render <li /> element as a wrapper', () => {
		NavItemComponent = shallow(
			<NavItem type='button' action={onClickFunc}>
				{NavItemText}
			</NavItem>,
		)
		expect(NavItemComponent.getElement().type).toBe('li')
	})

	describe('{ type="link" }', () => {
		beforeEach(() => {
			NavItemComponent = shallow(
				<NavItem type={linkType} to={location}>
					{NavItemText}
				</NavItem>,
			)
		})

		test('should contains children passed inside', () => {
			expect(NavItemComponent.contains(NavItemText)).toBe(true)
		})

		test('should contains some necessary props', () => {
			expect(NavItemComponent.find('NavLink').props()).toMatchObject({
				activeClassName: expect.any(String),
				to: location,
				exact: expect.any(Boolean),
				type: linkType,
			})
		})
	})

	describe('{ type="button" }', () => {
		beforeEach(() => {
			NavItemComponent = shallow(
				<NavItem type='button' action={onClickFunc}>
					{NavItemText}
				</NavItem>,
			)
		})

		test('should contains children passed inside', () => {
			expect(NavItemComponent.text()).toBe(NavItemText)
		})

		test('should contains some necessary props', () => {
			expect(NavItemComponent.find('button').props()).toMatchObject({
				type: buttonType,
				onClick: onClickFunc,
			})
		})

		test('should call function passed in action prop, after click', () => {
			NavItemComponent.find('button').simulate('click')
			expect(onClickFunc).toBeCalled()
		})
	})
})
