require('dotenv').config()
const { expect } = require('chai')
const browserHelper = require('../../../../scripts/browserHelper')

const { REACT_APP_TITLE } = process.env

describe('<Navbar />', () => {
	/**
	 * Desktop
	 */
	describe('On desktop screen size', () => {
		before('resize window', () => {
			browser.url('http://localhost:3000/')
			browser.setWindowSize(1300, 800)
		})

		// AuthNaigationTests()
		NonAuthNaigationTests()
	})

	/**
	 * Tablet
	 */
	describe('On small tablet screen size', () => {
		before('resize window', () => {
			browser.url('http://localhost:3000/')
			browser.setWindowSize(800, 600)
		})

		beforeEach(() => {
			browserHelper.customClick('#menuToggleButton')
			browser.$('#navList').waitForDisplayed()
			expect($('#navList').isDisplayedInViewport(), 'drawer should not be visible').to.be.true
		})

		afterEach(() => {
			browserHelper.waitUntilHide('#navList')
			expect($('#navList').isDisplayedInViewport(), 'drawer should not be visible').to.be.false
		})

		it('should not open drawer on click navbar', () => {
			browser.refresh()
			browserHelper.customClick('nav')
			expect($('#navList').isDisplayedInViewport()).to.be.false
		})

		it('should open and close drawer on click #menuToggleButton', () => {
			browser.refresh()

			browserHelper.customClick('#menuToggleButton')
			browser.$('#navList').waitForDisplayed()
			expect($('#navList').isDisplayedInViewport()).to.be.true

			browserHelper.customClick('#menuToggleButton')
			browserHelper.waitUntilHide('#navList')
			expect($('#navList').isDisplayedInViewport()).to.be.false
		})

		// AuthNaigationTests()
		NonAuthNaigationTests()
	})
})

function NonAuthNaigationTests() {
	describe('with NonAuth navigation', () => {
		it('MAPA - should change location to "/", after click "mapLink"', () => {
			browserHelper.customClick('#mapLink')
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#MapView').isDisplayed()).to.be.true
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
			const LoginModal = browser.$('#LoginModal')

			browser.pause(500)
			expect(LoginModal.isExisting()).to.be.true
			expect(LoginModal.isDisplayedInViewport()).to.be.true

			browserHelper.customClick('#ModalCloseButton')
			expect(LoginModal.isExisting()).to.be.false
		})
	})
}

function AuthNaigationTests() {
	describe('with Auth navigation', () => {
		it('should change location to "/nowe_zgloszenie", after click "plusLink"', () => {
			browserHelper.customClick('#plusLink')
			expect(browser.getUrl()).to.match(/\/nowe_zgloszenie$/)
			expect(browser.getTitle()).to.be.equal(`Nowe zgłoszenie | ${REACT_APP_TITLE}`)
			expect($('#NewNotification').isDisplayed()).to.be.true
		})

		it('should change location to "/", after click "mapLink"', () => {
			browserHelper.customClick('#mapLink')
			expect(browser.getUrl()).to.match(/\/$/)
			expect(browser.getTitle()).to.be.equal(`Mapa | ${REACT_APP_TITLE}`)
			expect($('#MapView').isDisplayed()).to.be.true
		})

		it('should change location to "/twoje_zgloszenia", after click "pinLink"', () => {
			browserHelper.customClick('#pinLink')
			expect(browser.getUrl()).to.match(/\/twoje_zgloszenia$/)
			expect(browser.getTitle()).to.be.equal(`Twoje zgłoszenia | ${REACT_APP_TITLE}`)
			expect($('#YourNotification').isDisplayed()).to.be.true
		})

		it('should change location to "/subskrypcje", after click "eyeLink"', () => {
			browserHelper.customClick('#eyeLink')
			expect(browser.getUrl()).to.match(/\/subskrypcje$/)
			expect(browser.getTitle()).to.be.equal(`Subskrypcje | ${REACT_APP_TITLE}`)
			expect($('#Subscription').isDisplayed()).to.be.true
		})

		it('should change location to "/ustawienia", after click "cogsLink"', () => {
			browserHelper.customClick('#cogsLink')
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
