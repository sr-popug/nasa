import './main.less'
// import Swiper core and required modules
import {
	A11y,
	Autoplay,
	EffectFade,
	Navigation,
	Pagination,
} from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import imagesDay from '../../../../store/imagesDay'
import loading from '../../../../store/loading'

const Main = observer(() => {
	const images = imagesDay.getImagesDay().slice(0, 5)
	const loadingM = loading.getLoading()

	return (
		<article className='main'>
			<div className={loadingM ? 'loading' : 'loading hidden'}>
				<div className='about-text'>Loading...</div>
			</div>
			<Swiper
				// install Swiper modules
				modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				loop={true}
				effect='fade'
				autoplay={{
					delay: 5000,
				}}
			>
				{images.map(image => {
					return (
						<SwiperSlide>
							<img
								src={new URL(`${image.hdurl}`, import.meta.url).href}
								alt='of-day'
							/>
							<div className='content'>
								<div className='top'>
									<NavLink to='/image-of-day' className='top-desc'>
										Image of the day
									</NavLink>
									<p className='date'>{image.date}</p>
								</div>
								<div className='main-content'>
									<h1>{image.title}</h1>
									<p className='desc'>
										{image.explanation.substring(0, 200)}...
									</p>
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</article>
	)
})
export default Main
