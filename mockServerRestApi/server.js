const jsonServer = require('json-server')
const routes = require('./generators/index.js')()

const server = jsonServer.create()
const router = jsonServer.router(routes)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/login', (req, res) => {
	const body = req.body
	const requestedUser = routes.users.find(user => user.email === body.email) || false
	const isAuth = requestedUser && requestedUser.password === body.password

	res.json({
		isAuth,
		data: {
			email: requestedUser ? requestedUser.email : '',
			nickname: requestedUser ? requestedUser.nickname : '',
		},
	})
})

server.post('/remind', (req, res) => {
	res.status(200).send()
})

server.put('/register_user', (req, res) => {
	const isValid = req.body.email && req.body.password && req.body.nickname

	if (isValid) {
		routes.users.push(req.body)
		res.status(201).send({})
	} else {
		res.status(400).send()
	}
})

server.use(router)
server.listen(4000, () => {
	console.log('JSON Server is running')
})
