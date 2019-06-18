const { generateUsersData } = require('./userDataGenerators')
const { notificationsData } = require('./notificationsGenerator')

module.exports = () => {
	const users = generateUsersData(30)

	return {
		users,
		notifications: notificationsData(200, users),
	}
}
