import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Status from '../Status'

configure({ adapter: new Adapter() })

describe('<Status />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let StatusElement
	const StatusText = 'ExampleText'
	const id = 'mockId'

	test('should render correctly Status type error', () => {
		StatusElement = shallow(<Status id={id} type='error' message={StatusText} />)
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should render correctly Status type warning', () => {
		StatusElement = shallow(<Status id={id} type='warning' message={StatusText} />)
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should render correctly Status type correct', () => {
		StatusElement = shallow(<Status id={id} type='correct' message={StatusText} />)
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should render correctly Status with position horizontal', () => {
		StatusElement = shallow(
			<Status id={id} type='correct' position='horizontal' message={StatusText} />,
		)
		expect(toJson(StatusElement)).toMatchSnapshot()
	})

	test('should render correctly Status with position vertical', () => {
		StatusElement = shallow(
			<Status id={id} type='correct' position='vertical' message={StatusText} />,
		)
		expect(toJson(StatusElement)).toMatchSnapshot()
	})
})
