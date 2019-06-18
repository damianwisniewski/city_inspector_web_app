const faker = require('faker')
faker.locale = 'pl'

const generateImages = () => {
	const randomImageAmount = Math.round(Math.random() * 5)
	const images = []

	for (let i = 0; i < randomImageAmount; i++) {
		images.push(faker.image.city())
	}

	return images
}

const ramdomStatus = () => {
	const randomImageAmount = Math.round(Math.random() * 2)

	if (randomImageAmount === 0) {
		return 'zgłoszone'
	} else if (randomImageAmount === 1) {
		return 'zrealizowane'
	} else if (randomImageAmount === 2) {
		return 'w realizacji'
	}
}

const ramdomCategory = () => {
	const randomImageAmount = Math.round(Math.random() * 3)

	if (randomImageAmount === 0) {
		return 'niebezpieczne miejsca'
	} else if (randomImageAmount === 1) {
		return 'uszkodzenia'
	} else if (randomImageAmount === 2) {
		return 'zaniedbana zieleń'
	} else if (randomImageAmount === 3) {
		return 'zanieczyszczona przestrzeń'
	}
}

const randomUserId = users => {
	const randomIndex = Math.round(Math.abs(Math.random() * users.length - 1))

	return users[randomIndex]['nickname']
}

exports.notificationsData = (amount, users) => {
	const notifications = []

	for (let i = 0; i < amount; i++) {
		notifications.push({
			user: randomUserId(users),
			category: ramdomCategory(),
			id: faker.random.number(999999),
			status: ramdomStatus(),
			title: faker.name.title(),
			description: faker.lorem.paragraph(),
			address: faker.address.streetAddress(true),
			localization: [
				// lat
				faker.random.number({
					min: 49.0273953314,
					max: 54.8515359564,
					precision: 0.0000001,
				}),
				// lon
				faker.random.number({
					min: 14.0745211117,
					max: 24.0299857927,
					precision: 0.0000001,
				}),
			],
			photos: generateImages(),
			date: faker.date.past(),
		})
	}

	return notifications
}
