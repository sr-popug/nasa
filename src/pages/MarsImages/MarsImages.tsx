import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { pageSelected } from '../../interfaces/interfaces'
import marsImages from '../../store/marsImages'
import './marsImages.less'

const MarsImages = observer(() => {
	const [pages, setPages] = useState(5)
	const [pageNumber, setPageNumber] = useState(0)
	const [images, setImages] = useState(marsImages.getMarsImages().slice(0, 40))
	useEffect(() => {
		setPages(Math.ceil(marsImages.getMarsImages().length / 40))
	}, [images])
	const handlePageClick = ({ selected }: pageSelected) => {
		setPageNumber(selected)

		setImages(
			marsImages.getMarsImages().slice(selected * 40, selected * 40 + 40)
		)
	}
	return (
		<article className='mars-images'>
			<div className='flex-top'>
				<h2>Mars Images</h2>
			</div>
			<section className='mars-images-list'>
				{images.map(image => {
					return (
						<article key={image.id} className='image'>
							<div className='about-img'>
								<img
									src={new URL(`${image.img_src}`, import.meta.url).href}
									alt='mars'
								/>
							</div>

							<div className='info'>
								<p className='date'>{image.earth_date}</p>
								<p className='rover'>
									rover: <strong>{image.rover.name}</strong>
								</p>
								<p className='camera'>
									<p className='rover'>
										<span>{image.camera.full_name}</span>
									</p>
								</p>
							</div>
						</article>
					)
				})}
			</section>
			<ReactPaginate
				pageCount={pages}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				onPageChange={handlePageClick}
				containerClassName={'pagination'}
				activeClassName={'active'}
				initialPage={pageNumber}
			/>
		</article>
	)
})
export default MarsImages
