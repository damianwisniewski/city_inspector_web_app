const { generateUsersData } = require('./userDataGenerators')
const { notificationsData } = require('./notificationsGenerator')

module.exports = () => {
	return {
		users: generateUsersData(30),
		notifications: notificationsData(40),
	}
}
