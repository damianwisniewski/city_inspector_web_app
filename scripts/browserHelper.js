module.exports = {
	/**
	 * Custom implementation of click method on selected element.
	 * @param {string} selector
	 *
	 * @summary
	 * Selenium on some browser may throw error at click on non interactive elements.
	 * Other situation is click on React-Router NavLink (<a />), throws:
	 * Request failed due to element not interactable: Element <a ... > could not be scrolled into view
	 */
	customClick: selector => {
		return browser.execute(function(element) {
			document.querySelector(element).click()
		}, selector)
	},

	/**
	 * Wait until selected element won't be visible in viewport
	 * @param {string} selector
	 */
	waitUntilHide: selector => {
		browser.waitUntil(() => $(selector).isDisplayedInViewport() === false)
	},
}
