import axios from 'axios'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import dsImg from './images/dsnnow.webp'
import earthImg from './images/earth.webp'
import './pages.less'

export default function Pages() {
	const [image, setImage] = useState('')

	axios
		.get(
			'https://api.nasa.gov/planetary/apod?api_key=uAkySIkY5Y2QsEtWlsyQ2IDNWBGVc6sSsiB8WHGf'
		)
		.then(res => {
			setImage(res.data.hdurl)
		})
	return (
		<article className='pages'>
			<h3>
				Click any to to immerse yourself in the incredible world of space{' '}
			</h3>

			<section className='blocks'>
				<NavLink to='/image-of-day'>
					<img src={new URL(image, import.meta.url).href} alt='of-day' />
					<section className='info'>
						<h4>Image of the day</h4>
						<p className='desc'>
							Every day, NASA selects a photo of the day that shows space or
							celestial phenomena, which gets to the main page.
						</p>
					</section>
				</NavLink>
				<NavLink to='mars-images'>
					<img src={earthImg} alt='of-day' />
					<section className='info'>
						<h4>Mars Images</h4>
						<p className='desc'>
							Dozens of rovers travel around Mars every day, taking photos of
							the surface of Mars for Earthlings
						</p>
					</section>
				</NavLink>
				<NavLink to='/phenomenon'>
					<img src={dsImg} alt='of-day' />
					<section className='info'>
						<h4>Natural Phenomenon</h4>
						<p className='desc'>
							Every day there are catastrophes and natural disasters on Earth,
							which are shown on this page.
						</p>
					</section>
				</NavLink>
			</section>
		</article>
	)
}
