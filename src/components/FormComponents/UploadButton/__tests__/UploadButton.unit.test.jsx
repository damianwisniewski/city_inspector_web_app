import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import UploadButton from '../UploadButton'

configure({ adapter: new Adapter() })

describe('<UploadButton />', () => {
	/**
	 * @type {ShallowWrapper}
	 */
	let SelectElement
	const id = 'mockId'
	const label = 'fakeLabel'
	const onAddImages = () => {}
	const acceptsFile = 'image/'

	const initialState = {
		onDropArea: false,
		loading: false,
		loadingFromDropEvent: false,
		loaded: false,
		files: [],
		error: '',
	}

	beforeEach(() => {
		SelectElement = shallow(
			<UploadButton onAddImages={onAddImages} id={id} label={label} acceptsFile={acceptsFile} />,
		)
	})

	test('should render correctly UploadButton', () => {
		expect(toJson(SelectElement)).toMatchSnapshot()
	})

	test('should render correctly UploadButton with loading state equal true', () => {
		SelectElement.setState({
			...initialState,
			loading: true,
		})
		expect(toJson(SelectElement)).toMatchSnapshot()
	})

	test('should render correctly UploadButton with onDropArea state equal true', () => {
		SelectElement.setState({
			...initialState,
			onDropArea: true,
		})
		expect(toJson(SelectElement)).toMatchSnapshot()
	})

	test('should render correctly UploadButton with loaded state equal true', () => {
		SelectElement.setState({
			...initialState,
			loaded: true,
			files: ['file1', 'file2', 'file3'],
		})
		expect(toJson(SelectElement)).toMatchSnapshot()
	})

	test('should render correctly UploadButton with error state', () => {
		SelectElement.setState({
			...initialState,
			error: 'fake error message',
		})
		expect(toJson(SelectElement)).toMatchSnapshot()
	})
})
