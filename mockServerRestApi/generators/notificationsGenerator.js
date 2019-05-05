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

exports.notificationsData = amount => {
	const notifications = []

	for (let i = 0; i < amount; i++) {
		notifications.push({
			category: ramdomCategory(),
			id: faker.random.uuid(),
			status: ramdomStatus(),
			title: faker.name.title(),
			description: faker.lorem.paragraph(),
			address: faker.address.streetAddress(true),
			localization: [faker.address.latitude(), faker.address.longitude()],
			photos: generateImages(),
			date: faker.date.past(),
		})
	}

	return notifications
}
