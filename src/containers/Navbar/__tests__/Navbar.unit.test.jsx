import React from 'react'
import { configure, shallow, mount, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { HashRouter } from 'react-router-dom'
import toJson from 'enzyme-to-json'

import { ModalRouter } from '../../../components/ModalComponents/ModalRouting'
import Navbar from '../Navbar'

configure({ adapter: new Adapter() })

describe('<Navbar />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let NavbarComponent

	beforeEach(() => {
		NavbarComponent = shallow(<Navbar.WrappedComponent />)
	})

	test('should set state "isDrawerOpen" to true, after click - menu toggle button', () => {
		NavbarComponent.setState({ isDrawerOpen: false })
		NavbarComponent.find('#menuToggleButton').simulate('click')
		expect(NavbarComponent.state().isDrawerOpen).toBe(true)
	})

	test('should set state "isDrawerOpen" to false, after click NavItem, for case it was true before', () => {
		NavbarComponent = mount(
			<HashRouter>
				<ModalRouter>
					<Navbar.WrappedComponent isUserAuth={true} />
				</ModalRouter>
			</HashRouter>,
		).find('Navbar')

		NavbarComponent.setState({ isDrawerOpen: true })
		NavbarComponent.find('button#helpLink').simulate('click')
		expect(NavbarComponent.state().isDrawerOpen).toBe(false)
	})

	test('should not change state property "isDrawerOpen", for case it has value false', () => {
		NavbarComponent = mount(
			<HashRouter>
				<ModalRouter>
					<Navbar.WrappedComponent isUserAuth={true} />
				</ModalRouter>
			</HashRouter>,
		).find('Navbar')

		NavbarComponent.setState({ isDrawerOpen: false })
		NavbarComponent.find('button#helpLink').simulate('click')
		expect(NavbarComponent.state().isDrawerOpen).toBe(false)
	})

	/**
	 * Snapshot
	 */
	test('(Auth) should contains proper Navigation items', () => {
		NavbarComponent.setProps({ isUserAuth: true })
		expect(toJson(NavbarComponent)).toMatchSnapshot()
	})

	/**
	 * Snapshot
	 */
	test('(Non-Auth) should contains proper Navigation items', () => {
		NavbarComponent.setProps({ isUserAuth: false })
		expect(toJson(NavbarComponent)).toMatchSnapshot()
	})
})
