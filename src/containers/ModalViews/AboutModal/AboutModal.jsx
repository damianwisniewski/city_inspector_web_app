import React from 'react'

// SCSS
import './AboutModal.scss'

// Components
import { Logo } from '../../../components/CommonComponents'

const AboutModal = () => (
	<div id='AboutModal' className='about'>
		<Logo title='City Inspector' size='large' />
		<p>
			Prawdopodonie każdemu z nas zalżey na tym, aby mieszkać w czystym i zadbanym miejscu. Dzięki
			aplikacji każdy z nas, w łatwy sposób może się do tego przyczynić. Wystarczy jedynie dokonać
			na stronie zgłoszenia, opisując problem oznaczając lokalizacje oraz dodając zdjęcia.
			Zgłoszenia będą monitorowane przez instytucje odpowiedzialne za rozwiązywanie tychże
			problemów, które bez waszego zgłoszenia mogłyby nie wiedzieć o danym problemie lub dowiedzieć
			się dużo później.
		</p>
	</div>
)

export default AboutModal
