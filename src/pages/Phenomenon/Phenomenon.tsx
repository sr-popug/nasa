import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import { pageSelected } from '../../interfaces/interfaces'
import naturalPhenomenons from '../../store/naturalPhenomenons'
import fireSVG from './images/fire.svg'
import iceSVG from './images/iceberg.svg'
import stormSVG from './images/storm.svg'
import volcanoSVG from './images/volcano.svg'
import './phenomenon.less'

const whatSVG = function (svgID: string) {
	switch (svgID) {
		case 'wildfires':
			return <img key={svgID} src={fireSVG} alt='fire' />
		case 'severeStorms':
			return <img key={svgID} src={stormSVG} alt='storm' />
		case 'volcanoes':
			return <img key={svgID} src={volcanoSVG} alt='volcano' />
		case 'seaLakeIce':
			return <img key={svgID} src={iceSVG} alt='iceberg' />
	}
}
const Phenomenon = observer(() => {
	const [pages, setPages] = useState(5)
	const [pageNumber, setPageNumber] = useState(0)
	const [phenomens, setPhenomens] = useState(
		naturalPhenomenons.getNaturalPhenomenons().slice(0, 50)
	)
	useEffect(() => {
		setPages(Math.ceil(naturalPhenomenons.getNaturalPhenomenons().length / 50))
	}, [phenomens])
	const handlePageClick = ({ selected }: pageSelected) => {
		setPageNumber(selected)

		setPhenomens(
			naturalPhenomenons
				.getNaturalPhenomenons()
				.slice(selected * 50, selected * 50 + 50)
		)
	}
	const navigate = useNavigate()

	return (
		<article className='phenomenon'>
			<div className='flex-top'>
				<h2>Natural phenomenons</h2>
			</div>
			<table>
				<tbody>
					{phenomens.length &&
						phenomens.map(phenomen => {
							return (
								<tr
									key={phenomen.id}
									onClick={() => navigate(`/phenomenon/${phenomen.id}`)}
								>
									<td className='categories'>
										{phenomen.categories.map(category => {
											return whatSVG(category.id)
										})}
									</td>

									<td className='title'>{phenomen.title}</td>
									<td className='date'>
										{phenomen.geometry[0].date.split('T')[0]}
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
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
export default Phenomenon
