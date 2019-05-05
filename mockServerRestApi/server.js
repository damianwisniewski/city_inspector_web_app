const jsonServer = require('json-server')
const routes = require('./generators/index.js')()

const server = jsonServer.create()
const router = jsonServer.router(routes)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/userAuth', (req, res) => {
	const requestedUser = routes.users.find(user => user.email === req.body.email)
	const isAuth = requestedUser.password === req.body.password

	res.json({
		email: req.body.email,
		isAuth,
	})
})

server.put('/newUser', (req, res) => {
	const isValid = req.body.email && req.body.password && req.body.nickname

	if (isValid) {
		routes.users.push(req.body)
		res.status(201).send()
	} else {
		res.status(400).send()
	}
})

server.use(router)
server.listen(4000, () => {
	console.log('JSON Server is running')
})
