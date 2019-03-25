const { spawn } = require('child_process')
const chalk = require('chalk')
const http = require('http')

module.exports = class TestserverService {
	constructor() {
		this.url = 'http://localhost:3000/'
		this.testserver = undefined
	}

	/**
	 * WDIO Hook
	 * Gets executed once before all workers get launched.
	 */
	onPrepare() {
		return new Promise(resolve => {
			this.checkConnection({ retry: false })
				.then(() => {
					resolve()
				})
				.catch(() => {
					this.runTestserver()
					this.checkConnection({ retry: true })
						.then(() => {
							resolve()
						})
						.catch(() => {
							this.closeTestserver()
							this.stopProcessWithError()
						})
				})
		})
	}

	/**
	 * WDIO Hook
	 * Gets executed after all workers got shut down and the process is about to exit.
	 */
	onComplete() {
		this.closeTestserver()
	}

	/**
	 * Runs testserver by using react-script start, the same as npm start
	 */
	runTestserver() {
		this.testserver = spawn('react-scripts', ['start'], { detached: true })

		this.testserver.stdout.on('data', function(data) {
			console.log(`${chalk.black.bgGreen(' TESTSERVER ')} ${data}`.trim())
		})

		this.testserver.stderr.on('data', function(data) {
			console.log(`${chalk.white.bgRed(' TESTSERVER ERROR ')} ${data}`.trim())
		})
	}

	/**
	 * Checks if connection with localserver is possible.
	 * It's possible to retry multiple tries of connection.
	 * @param {Object} options
	 * @param {boolean} options.retry true to try multiple connection
	 * @returns {Promise} result of connection
	 */
	checkConnection(options) {
		return new Promise((resolve, reject) => {
			const callback = res => {
				if (res.statusCode === 200) {
					console.log(
						`${chalk.black.bgGreen(' TESTSERVER ')} testserver connection ${chalk.green('✔︎')}`,
					)
					resolve()
				} else {
					reject()
				}
			}

			if (options.retry) {
				this.repeatableRequest(
					{
						url: this.url,
						retriesNumber: 4,
						timeout: 5000,
					},
					callback,
				).catch(() => {
					reject()
				})
			} else {
				http.get(this.url, callback).on('error', () => {
					console.log(
						`${chalk.black.bgGreen(' TESTSERVER ')} testserver connection ${chalk.red('✖')}`,
					)
					reject()
				})
			}
		})
	}

	/**
	 * Retries requests if the previous failed
	 * @param {Object} options
	 * @param {string} options.url - url for request
	 * @param {string} options.retriesNumber - amount of connection tries
	 * @param {string} options.timeout - timeout between each try
	 * @param {Function} callback - function to call, after initialize connection
	 */
	repeatableRequest(options, callback) {
		return new Promise((resolve, reject) => {
			const req = http.get(options.url, callback)
			req.on('error', () => {
				req.abort()
				req.socket.destroy()

				if (options.retriesNumber > 0) {
					options.retriesNumber--
					setTimeout(() => this.repeatableRequest(options, callback), options.timeout)
				} else {
					console.log(
						`${chalk.black.bgGreen(' TESTSERVER ')} testserver connection ${chalk.red('✖')}`,
					)
					reject()
				}
			})
		})
	}

	/**
	 * Kills process and notifies about connection problem
	 */
	stopProcessWithError() {
		console.log(`${chalk.black.bgGreen(' TESTSERVER ')} testserver connection ${chalk.red('✖')}`)
		console.log(
			chalk.black.bgGreen(' TESTSERVER '),
			'Connection with localserver failed for some reason, check build process!',
		)
		process.exit(1)
	}

	/**
	 * Kills testserver child process
	 */
	closeTestserver() {
		if (this.testserver && !this.testserver.killed) {
			/**
			 * Passing child's pid as argument to kill method, will kill standalone processes only.
			 * For situation, if process has own child process, to kill it you have to kill whole group of processes.
			 * To kill whole group of processes, you have to pass this pattern => "-[pid of parent process]"
			 */
			process.kill(`-${this.testserver.pid}`)
			console.log(`${chalk.black.bgGreen(' TESTSERVER ')} Closed`)
		}
	}
}
