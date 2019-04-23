require('dotenv').config()
const { expect } = require('chai')

const { REACT_APP_TITLE } = process.env

describe('<App />', () => {
	describe('Routes for Non-Auth user', () => {
		it('should render MapView for enter to location "/"', () => {
			browser.url('http://localhost:3000/')

			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#MapView').isDisplayed()).to.be.true
		})

		it('should redirect from "/nowe_zgloszenie" to "/" and show Login Popup', () => {
			browser.url('http://localhost:3000/nowe_zgloszenie')
			browser.pause(500)
			expect($('#NewNotification').isExisting()).to.be.false
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#LoginPopup').isDisplayed()).to.be.true
		})

		it('should redirect from "/twoje_zgloszenia" to "/" and show Login Popup', () => {
			browser.url('http://localhost:3000/twoje_zgloszenia')
			browser.pause(500)
			expect($('#NewNotification').isExisting()).to.be.false
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#LoginPopup').isDisplayed()).to.be.true
		})

		it('should redirect from "/ustawienia" to "/" and show Login Popup', () => {
			browser.url('http://localhost:3000/ustawienia')
			browser.pause(500)
			expect($('#NewNotification').isExisting()).to.be.false
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#LoginPopup').isDisplayed()).to.be.true
		})

		it('should redirect from "/subskrypcje" to "/" and show Login Popup', () => {
			browser.url('http://localhost:3000/subskrypcje')
			browser.pause(500)
			expect($('#NewNotification').isExisting()).to.be.false
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#LoginPopup').isDisplayed()).to.be.true
		})

		it('should render NotFound for enter to location "/fake_location"', () => {
			browser.url('http://localhost:3000/fake_location')

			expect(browser.getTitle()).to.be.equal(`404 - Not Found | ${REACT_APP_TITLE}`)
			expect($('#NotFound').isDisplayed()).to.be.true
		})
	})

	describe('Routes for Auth user', () => {
		it('should render MapView for enter to location "/"', () => {
			browser.url('http://localhost:3000/')

			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#MapView').isDisplayed()).to.be.true
		})

		it('should render NewNotification for enter to location "/nowe_zgloszenie"', () => {
			browser.url('http://localhost:3000/nowe_zgloszenie')

			expect(browser.getTitle()).to.be.equal(`Nowe zgłoszenie | ${REACT_APP_TITLE}`)
			expect($('#NewNotification').isDisplayed()).to.be.true
		})

		it('should render YourNotification for enter to location "/twoje_zgloszenia"', () => {
			browser.url('http://localhost:3000/twoje_zgloszenia')

			expect(browser.getTitle()).to.be.equal(`Twoje zgłoszenia | ${REACT_APP_TITLE}`)
			expect($('#YourNotification').isDisplayed()).to.be.true
		})

		it('should render Subscription for enter to location "/subskrypcje"', () => {
			browser.url('http://localhost:3000/subskrypcje')

			expect(browser.getTitle()).to.be.equal(`Subskrypcje | ${REACT_APP_TITLE}`)
			expect($('#Subscription').isDisplayed()).to.be.true
		})

		it('should render Settings for enter to location "/ustawienia"', () => {
			browser.url('http://localhost:3000/ustawienia')

			expect(browser.getTitle()).to.be.equal(`Ustawienia | ${REACT_APP_TITLE}`)
			expect($('#Settings').isDisplayed()).to.be.true
		})

		it('should render NotFound for enter to location "/fake_location"', () => {
			browser.url('http://localhost:3000/fake_location')

			expect(browser.getTitle()).to.be.equal(`404 - Not Found | ${REACT_APP_TITLE}`)
			expect($('#NotFound').isDisplayed()).to.be.true
		})
	})
})
