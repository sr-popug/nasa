import axios from 'axios'
import { observer } from 'mobx-react-lite'
import React, { useRef, useState } from 'react'
import { imageOfDay } from '../../interfaces/interfaces'
import imagesDay from '../../store/imagesDay'
import './imageDay.less'

const ImageDay = observer(() => {
	const images = imagesDay.getImagesDay().slice(0, 15)
	const [oneImage, setOneImage] = useState<imageOfDay>({
		copyright: '',
		date: '',
		explanation: '',
		hdurl: '',
		media_type: '',
		service_version: '',
		title: '',
		url: '',
	})
	const date = useRef<HTMLInputElement>(null)
	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (date.current != null) {
			if (date.current.value == '') {
				axios
					.get(
						'https://api.nasa.gov/planetary/apod?api_key=uAkySIkY5Y2QsEtWlsyQ2IDNWBGVc6sSsiB8WHGf&start_date=2024-06-15'
					)
					.then(res => {
						imagesDay.setImagesDay(
							res.data
								.filter((elem: imageOfDay) => elem['media_type'] == 'image')
								.slice(-15)
								.reverse()
						)
					})
			} else {
				axios
					.get(
						`https://api.nasa.gov/planetary/apod?api_key=uAkySIkY5Y2QsEtWlsyQ2IDNWBGVc6sSsiB8WHGf&date=${date.current.value}`
					)
					.then(res => {
						setOneImage(res.data)
					})
			}

			console.log(images)
		}
	}
	return (
		<article className='imageDay'>
			<div className='flex-top'>
				<h2>Images of days</h2>
				<form
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
						submit(e)
					}}
					action=''
				>
					<input ref={date} id='date' type='date' />
					<button type='submit'>Submit</button>
				</form>
			</div>
			<div className='images'>
				{!oneImage.title &&
					images.map(image => {
						return (
							<article key={image.date} className='image'>
								<div className='info'>
									<h3>{image.title}</h3>
									<p className='desc'>{image.explanation}</p>
									<div className='line'></div>
									<div className='bottom'>
										<div className='date'>{image.date}</div>
										<div className='author'>
											{image.copyright && 'Author:'}{' '}
											<span>{image.copyright}</span>
										</div>
									</div>
								</div>
								<img
									src={new URL(`${image.hdurl}`, import.meta.url).href}
									alt='of-day'
								/>
							</article>
						)
					})}
				{oneImage.title && (
					<article className='image'>
						<div className='info'>
							<h3>{oneImage.title}</h3>
							<p className='desc'>{oneImage.explanation}</p>
							<div className='line'></div>
							<div className='bottom'>
								<div className='date'>{oneImage.date}</div>
								<div className='author'>
									{oneImage.copyright && 'Author:'}{' '}
									<span>{oneImage.copyright}</span>
								</div>
							</div>
						</div>

						<img
							src={new URL(`${oneImage.hdurl}`, import.meta.url).href}
							alt='of-day'
						/>
					</article>
				)}
			</div>
		</article>
	)
})
export default ImageDay
