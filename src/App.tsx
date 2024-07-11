import axios from 'axios'
import { useEffect, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './common/Footer/Footer'
import Header from './common/Header/Header'
import { imageOfDay } from './interfaces/interfaces'
import ImageDay from './pages/ImageDay/ImageDay'
import MainPage from './pages/Main/MainPage'
import MarsImages from './pages/MarsImages/MarsImages'
import Phenomen from './pages/Phenomenon/Phenomen/Phenomen'
import Phenomenon from './pages/Phenomenon/Phenomenon'
import imagesDay from './store/imagesDay'
import loading from './store/loading'
import marsImages from './store/marsImages'
import naturalPhenomenons from './store/naturalPhenomenons'

function App() {
	const location = useLocation()
	useLayoutEffect(() => {
		window.scrollTo(0, 0)
	}, [location.pathname])

	useEffect(() => {
		axios
			.get(
				'https://api.nasa.gov/planetary/apod?api_key=uAkySIkY5Y2QsEtWlsyQ2IDNWBGVc6sSsiB8WHGf&start_date=2024-06-15'
			)
			.then(res => {
				console.log(res)
				imagesDay.setImagesDay(
					res.data
						.filter((elem: imageOfDay) => elem['media_type'] == 'image')
						.slice(-15)
						.reverse()
				)
				loading.setLoading()
			})
		axios.get('https://eonet.gsfc.nasa.gov/api/v3/events').then(res => {
			naturalPhenomenons.setNaturalPhenomenons(res.data.events)
		})
		axios
			.get(
				'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?&sol=1000&api_key=uAkySIkY5Y2QsEtWlsyQ2IDNWBGVc6sSsiB8WHGf'
			)
			.then(res => {
				marsImages.setMarsImages(res.data.photos)
			})
	}, [])
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/phenomenon' element={<Phenomenon />} />
				<Route path='/phenomenon/:id' element={<Phenomen />} />

				<Route path='/image-of-day' element={<ImageDay />} />
				<Route path='/mars-images' element={<MarsImages />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
