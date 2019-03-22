const chalk = require('chalk')

let browserCapabilities = [
	{ browserName: 'chrome' },
	{ browserName: 'firefox' },
	{ browserName: 'safari' },
	{ browserName: 'IE' },
	{ browserName: 'Edge' },
]

/**
 * Filters browsers capabilities by possibilities of you operation system
 */
browserCapabilities = browserCapabilities
	.filter(item => (item.browserName === 'safari' ? process.platform === 'darwin' : true))
	.filter(item =>
		item.browserName === 'IE' || item.browserName === 'Edge' ? process.platform === 'win32' : true,
	)

const browserListPattern = new RegExp(`(?:--browsers?=)(?=(.+))`)
const requestedBrowsers = process.argv.find(item => browserListPattern.test(item))
let listOfRequestedBrowsers = []

if (requestedBrowsers) {
	/**
	 * Parses passed argument to array of browsers
	 */
	listOfRequestedBrowsers = requestedBrowsers
		.match(browserListPattern)[1]
		.split(',')
		.map(arg => arg.toLowerCase())

	/**
	 * Validation of requested browsers
	 */
	const capabilityNames = browserCapabilities.map(browser => browser.browserName.toLowerCase())
	listOfRequestedBrowsers.forEach(capabilityName => {
		if (!capabilityNames.includes(capabilityName)) {
			console.error(chalk.white.bgRed('ERROR:'), ` Unknown browser: "${capabilityName}"\n`)
			process.exit(1)
		}
	})

	/**
	 * Filters browser capabilities, by requested browsers
	 */
	browserCapabilities = browserCapabilities.filter(item =>
		listOfRequestedBrowsers
			? listOfRequestedBrowsers.includes(item.browserName.toLowerCase())
			: true,
	)
}

if (browserCapabilities.length <= 0) {
	console.error(
		chalk.white.bgRed('ERROR:'),
		"You don't have this browser on your local machine. Please check your browsers arguments!\n",
	)
	process.exit(1)
}

module.exports = browserCapabilities
