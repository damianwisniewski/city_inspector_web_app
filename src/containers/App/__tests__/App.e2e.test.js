const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') })
const { expect } = require('chai')
const browserHelper = require('../../../../scripts/browserHelper')

const { REACT_APP_TITLE, AUTH_LOGIN, AUTH_PASS } = process.env

describe('<App />', () => {
	describe('Routes for Non-Auth user', () => {
		it('should render MapView for enter to location "/"', () => {
			browser.url(`/`)

			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#map-view').isDisplayed()).to.be.true
		})

		it('should redirect from "/nowe_zgloszenie" to "/" and show Login Modal', () => {
			browser.url('/nowe_zgloszenie')
			browser.pause(500)
			expect($('#new-notification').isExisting()).to.be.false
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#login-modal').isDisplayed()).to.be.true
		})

		it('should redirect from "/twoje_zgloszenia" to "/" and show Login Modal', () => {
			browser.url('/twoje_zgloszenia')
			browser.pause(500)
			expect($('#new-notification').isExisting()).to.be.false
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#login-modal').isDisplayed()).to.be.true
		})

		it('should redirect from "/ustawienia" to "/" and show Login Modal', () => {
			browser.url('/ustawienia')
			browser.pause(500)
			expect($('#new-notification').isExisting()).to.be.false
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#login-modal').isDisplayed()).to.be.true
		})

		it('should redirect from "/subskrypcje" to "/" and show Login Modal', () => {
			browser.url('/subskrypcje')
			browser.pause(500)
			expect($('#new-notification').isExisting()).to.be.false
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#login-modal').isDisplayed()).to.be.true
		})

		it('should render NotFound for enter to location "/fake_location"', () => {
			browser.url('/fake_location')

			expect(browser.getTitle()).to.be.equal(`404 - Not Found | ${REACT_APP_TITLE}`)
			expect($('#NotFound').isDisplayed()).to.be.true
		})
	})

	describe('Routes for Auth user', () => {
		before(() => {
			browser.url('/')
			browserHelper.customClick('#loginButton')
			$('#login-email-field').setValue(AUTH_LOGIN)
			$('#login-password-field').setValue(AUTH_PASS)
			browserHelper.customClick('#login-submit-button')

			browser.waitUntil(
				() => {
					return $('#login-modal').isExisting() === false
				},
				2000,
				'expected text to be different after 2s',
			)
		})

		it('should render MapView for enter to location "/"', () => {
			browser.url('/')
			browser.pause(500)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#map-view').isDisplayed()).to.be.true
		})

		it('should render NewNotification for enter to location "/nowe_zgloszenie"', () => {
			browser.url('/nowe_zgloszenie')
			browser.pause(500)
			expect(browser.getTitle()).to.be.equal(`Nowe zgłoszenie | ${REACT_APP_TITLE}`)
			expect($('#new-notification').isDisplayed()).to.be.true
		})

		it('should render YourNotification for enter to location "/twoje_zgloszenia"', () => {
			browser.url('/twoje_zgloszenia')
			browser.pause(500)
			expect(browser.getTitle()).to.be.equal(`Twoje zgłoszenia | ${REACT_APP_TITLE}`)
			expect($('#YourNotification').isDisplayed()).to.be.true
		})

		it('should render Subscription for enter to location "/subskrypcje"', () => {
			browser.url('/subskrypcje')
			browser.pause(500)
			expect(browser.getTitle()).to.be.equal(`Subskrypcje | ${REACT_APP_TITLE}`)
			expect($('#Subscription').isDisplayed()).to.be.true
		})

		it('should render Settings for enter to location "/ustawienia"', () => {
			browser.url('/ustawienia')
			browser.pause(500)
			expect(browser.getTitle()).to.be.equal(`Ustawienia | ${REACT_APP_TITLE}`)
			expect($('#Settings').isDisplayed()).to.be.true
		})

		it('should render NotFound for enter to location "/fake_location"', () => {
			browser.url('/fake_location')
			browser.pause(500)
			expect(browser.getTitle()).to.be.equal(`404 - Not Found | ${REACT_APP_TITLE}`)
			expect($('#NotFound').isDisplayed()).to.be.true
		})
	})
})
