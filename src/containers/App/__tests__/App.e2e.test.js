require('dotenv').config()
const { expect } = require('chai')

const { REACT_APP_TITLE } = process.env

describe('<App />', () => {
	describe('Routes', () => {
		//TODO: Split tests for auth and non auth routes
		it('should render MapView for enter to location "/"', () => {
			browser.url('http://localhost:3000/')
			const container = browser.$('#MapView')

			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect(container.isDisplayed()).to.be.true
		})

		it('should render NewNotification for enter to location "/nowe_zgloszenie"', () => {
			browser.url('http://localhost:3000/nowe_zgloszenie')
			const container = browser.$('#NewNotification')

			expect(browser.getTitle()).to.be.equal(`Nowe zgłoszenie | ${REACT_APP_TITLE}`)
			expect(container.isDisplayed()).to.be.true
		})

		it('should render YourNotification for enter to location "/twoje_zgloszenia"', () => {
			browser.url('http://localhost:3000/twoje_zgloszenia')
			const container = browser.$('#YourNotification')

			expect(browser.getTitle()).to.be.equal(`Twoje zgłoszenia | ${REACT_APP_TITLE}`)
			expect(container.isDisplayed()).to.be.true
		})

		it('should render Subscription for enter to location "/subskrypcje"', () => {
			browser.url('http://localhost:3000/subskrypcje')
			const container = browser.$('#Subscription')

			expect(browser.getTitle()).to.be.equal(`Subskrypcje | ${REACT_APP_TITLE}`)
			expect(container.isDisplayed()).to.be.true
		})

		it('should render Settings for enter to location "/ustawienia"', () => {
			browser.url('http://localhost:3000/ustawienia')
			const container = browser.$('#Settings')

			expect(browser.getTitle()).to.be.equal(`Ustawienia | ${REACT_APP_TITLE}`)
			expect(container.isDisplayed()).to.be.true
		})

		it('should render NotFound for enter to location "/fake_location"', () => {
			browser.url('http://localhost:3000/fake_location')
			const container = browser.$('#NotFound')

			expect(browser.getTitle()).to.be.equal(`404 - Not Found | ${REACT_APP_TITLE}`)
			expect(container.isDisplayed()).to.be.true
		})
	})
})
