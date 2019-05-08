import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import ForgottenPassPopup from '../ForgottenPassPopup'

configure({ adapter: new Adapter() })

describe('<ForgottenPassPopup />', () => {
	let ForgottenPassPopupElement
	const resetState = jest.fn()

	beforeEach(() => {
		ForgottenPassPopupElement = shallow(
			<ForgottenPassPopup.WrappedComponent
				resetPassRemindRequestStatus={resetState}
				passReminderRequestStatus='initial'
			/>,
		)
	})

	test('should call resetState after mount', () => {
		expect(resetState).toBeCalled()
	})

	test('should render correctly ForgottenPassPopup', () => {
		expect(toJson(ForgottenPassPopupElement)).toMatchSnapshot()
	})
})
