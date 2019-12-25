const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') })
const { expect } = require('chai')
const browserHelper = require('../../../../scripts/browserHelper')

const { REACT_APP_TITLE, AUTH_LOGIN, AUTH_PASS } = process.env

describe('<Navbar />', () => {
	/**
	 * Desktop
	 */
	describe('On desktop screen size', () => {
		before('resize window', () => {
			browser.url('/')
			browser.setWindowSize(1300, 800)
		})

		NonAuthNaigationTests('desktop')
		AuthNaigationTests('desktop')
	})

	/**
	 * Tablet
	 */
	describe('On small tablet screen size', () => {
		before('resize window', () => {
			browser.url('/')
			browser.pause(500)
			browser.setWindowSize(800, 600)
		})

		it('should open and close drawer on click #menuToggleButton', () => {
			browserHelper.customClick('#menuToggleButton')
			browser.$('#navList').waitForDisplayed()
			expect($('#navList').isDisplayedInViewport()).to.be.true

			browserHelper.customClick('#menuToggleButton')
			browserHelper.waitUntilHide('#navList')
			expect($('#navList').isDisplayedInViewport()).to.be.false
		})

		NonAuthNaigationTests('mobile')
		AuthNaigationTests('mobile')
	})
})

function NonAuthNaigationTests(device) {
	describe('with NonAuth navigation', () => {
		if (device === 'mobile') {
			beforeEach(() => {
				makeSureMenuIsOpen()
			})

			afterEach(() => {
				makeSureMenuIsClosed()
			})
		}

		before(() => {
			logout()
		})

		it('MAPA - should change location to "/", after click "mapLink"', () => {
			browserHelper.customClick('#mapLink')

			browser.pause(500)
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#map-view').isDisplayed()).to.be.true
		})

		it('POMOC - should open help Modal, after click navigation button with id "helpLink"', () => {
			browserHelper.customClick('#helpLink')
			const AboutModal = browser.$('#AboutModal')

			browser.pause(500)
			expect(AboutModal.isExisting()).to.be.true
			expect(AboutModal.isDisplayedInViewport()).to.be.true

			browserHelper.customClick('#ModalCloseButton')
			expect(AboutModal.isExisting()).to.be.false
		})

		it(`REJESTRACJA - should open signup Modal, after click navigation button with id "registerButton" and close it after click close button`, () => {
			browserHelper.customClick('#registerButton')
			const SignupModal = browser.$('#SignupModal')

			browser.pause(500)
			expect(SignupModal.isExisting()).to.be.true
			expect(SignupModal.isDisplayedInViewport()).to.be.true

			browserHelper.customClick('#ModalCloseButton')
			expect(SignupModal.isExisting()).to.be.false
		})

		it(`LOGOWANIE - should open signup Modal, after click navigation button with id "registerButton" and close it after click close button`, () => {
			browserHelper.customClick('#loginButton')
			const LoginModal = browser.$('#login-modal')

			browser.pause(500)
			expect(LoginModal.isExisting()).to.be.true
			expect(LoginModal.isDisplayedInViewport()).to.be.true

			browserHelper.customClick('#ModalCloseButton')
			expect(LoginModal.isExisting()).to.be.false
		})
	})
}

function AuthNaigationTests(device) {
	describe('with Auth navigation', () => {
		if (device === 'mobile') {
			beforeEach(() => {
				makeSureMenuIsOpen()
			})

			afterEach(() => {
				makeSureMenuIsClosed()
			})
		}

		before(() => {
			browser.url('/')
			login()
		})

		it('should change location to "/nowe_zgloszenie", after click "plusLink"', () => {
			browserHelper.customClick('#plusLink')
			browser.pause(500)
			expect(browser.getUrl()).to.match(/\/nowe_zgloszenie$/)
			expect(browser.getTitle()).to.be.equal(`Nowe zgłoszenie | ${REACT_APP_TITLE}`)
			expect($('#new-notification').isDisplayed()).to.be.true
		})

		it('should change location to "/", after click "mapLink"', () => {
			browserHelper.customClick('#mapLink')
			browser.pause(500)
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#map-view').isDisplayed()).to.be.true
		})

		it('should change location to "/twoje_zgloszenia", after click "pinLink"', () => {
			browserHelper.customClick('#pinLink')
			browser.pause(500)
			expect(browser.getUrl()).to.match(/\/twoje_zgloszenia$/)
			expect(browser.getTitle()).to.be.equal(`Twoje zgłoszenia | ${REACT_APP_TITLE}`)
			expect($('#YourNotification').isDisplayed()).to.be.true
		})

		it('should change location to "/subskrypcje", after click "eyeLink"', () => {
			browserHelper.customClick('#eyeLink')
			browser.pause(500)
			expect(browser.getUrl()).to.match(/\/subskrypcje$/)
			expect(browser.getTitle()).to.be.equal(`Subskrypcje | ${REACT_APP_TITLE}`)
			expect($('#Subscription').isDisplayed()).to.be.true
		})

		it('should change location to "/ustawienia", after click "cogsLink"', () => {
			browserHelper.customClick('#cogsLink')
			browser.pause(500)
			expect(browser.getUrl()).to.match(/\/ustawienia$/)
			expect(browser.getTitle()).to.be.equal(`Ustawienia | ${REACT_APP_TITLE}`)
			expect($('#Settings').isDisplayed()).to.be.true
		})

		it('should open help Modal, after click navigation button with id "helpLink"', () => {
			browserHelper.customClick('#helpLink')
			const AboutModal = browser.$('#AboutModal')

			browser.pause(500)
			expect(AboutModal.isExisting()).to.be.true
			expect(AboutModal.isDisplayedInViewport()).to.be.true

			browserHelper.customClick('#ModalCloseButton')
			expect(AboutModal.isExisting()).to.be.false
		})
	})
}

function makeSureMenuIsOpen() {
	if (!$('#navList').isDisplayedInViewport()) {
		browserHelper.customClick('#menuToggleButton')
		$('#navList').waitForDisplayed()
	}
}

function makeSureMenuIsClosed() {
	if ($('#navList').isDisplayedInViewport()) {
		browserHelper.customClick('#menuToggleButton')
		browserHelper.waitUntilHide('#navList')
	}
}

function login() {
	const loginButtonExist = $('#loginButton').isExisting()

	if (loginButtonExist) {
		browserHelper.customClick('#loginButton')
		$('#login-email-field').setValue(AUTH_LOGIN)
		$('#login-password-field').setValue(AUTH_PASS)
		browserHelper.customClick('#login-submit-button')

		browser.waitUntil(() => {
			return $('#login-modal').isExisting() === false
		}, 2000)
	}
}

function logout() {
	const logoutButtonExist = $('#logoutLink').isExisting()

	if (logoutButtonExist) {
		browserHelper.customClick('#logoutLink')
		browser.waitUntil(() => {
			return $('#logout-modal').isExisting() === true
		}, 2000)

		browserHelper.customClick('#logout-confirm')
	}
}
