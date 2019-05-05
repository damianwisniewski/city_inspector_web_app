const faker = require('faker')
faker.locale = 'pl'

exports.generateUsersData = amount => {
	const userData = [
		{
			email: 'test@example.org',
			password: 'test123',
			nickname: 'test_account',
			firstname: 'Fake',
			lastname: 'Taster',
			city: 'Mock',
		},
	]

	for (let i = 0; i < amount; i++) {
		const randomly = Boolean(Math.round(Math.random()))

		userData.push({
			email: faker.internet.email(),
			password: faker.internet.password(),
			nickname: faker.internet.userName(),
			firstname: randomly ? faker.name.firstName() : '',
			lastname: randomly ? faker.name.lastName() : '',
			city: randomly ? faker.address.city() : '',
		})
	}

	return userData
}
