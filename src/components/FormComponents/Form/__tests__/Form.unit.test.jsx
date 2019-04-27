import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Form from '../Form'

configure({ adapter: new Adapter() })

describe('<Form />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let FormElement
	const FormContent = <input />
	const id = 'mockId'

	test('should render correctly Form', () => {
		FormElement = shallow(<Form id={id}>{FormContent}</Form>)
		expect(toJson(FormElement)).toMatchSnapshot()
	})
})
