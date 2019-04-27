import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Loader from '../Loader'

configure({ adapter: new Adapter() })

describe('<Loader />', () => {
	let LoaderElement
	const id = 'loaderTest'

	test('should render correctly Loader', () => {
		LoaderElement = shallow(<Loader id={id} />)
		expect(toJson(LoaderElement)).toMatchSnapshot()
	})

	test('should render correctly Loader width size "small"', () => {
		LoaderElement = shallow(<Loader id={id} size='small' />)
		expect(toJson(LoaderElement)).toMatchSnapshot()
	})

	test('should render correctly Loader width size "medium"', () => {
		LoaderElement = shallow(<Loader id={id} size='medium' />)
		expect(toJson(LoaderElement)).toMatchSnapshot()
	})

	test('should render correctly Loader width size "large"', () => {
		LoaderElement = shallow(<Loader id={id} size='large' />)
		expect(toJson(LoaderElement)).toMatchSnapshot()
	})
})
