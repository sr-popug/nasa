import { Map, YMaps } from '@pbe/react-yandex-maps'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { phenomenon } from '../../../interfaces/interfaces'
import fireSVG from '../images/fire.svg'
import iceSVG from '../images/iceberg.svg'
import stormSVG from '../images/storm.svg'
import volcanoSVG from '../images/volcano.svg'
import './phenomen.less'
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
export default function Phenomen() {
	const [phenomen, setPhenomen] = useState<phenomenon & object>()
	const params = useParams()
	const [cords, setCords] = useState([20, 20])
	useEffect(() => {
		axios
			.get(`https://eonet.gsfc.nasa.gov/api/v3/events/${params.id}`)
			.then(res => {
				setPhenomen(res.data)
				console.log(res.data)
				setCords([
					Number(Number(res.data.geometry[0].coordinates[1]).toFixed(4)),
					Number(Number(res.data.geometry[0].coordinates[0]).toFixed(4)),
				])
			})
	}, [params.id])
	return (
		<article className='phenomen'>
			<div className='top'>
				<div className='left'>
					<div className='types'>
						{phenomen?.categories?.map(category => {
							return whatSVG(category.id)
						})}
					</div>
					<h2>{phenomen?.title}</h2>
				</div>
			</div>
			<div className='info'>
				<div className='info-block'>
					Date{' '}
					<span>
						{phenomen?.title && phenomen?.geometry[0]?.date?.split('T')[0]}
					</span>
				</div>
				<div className='info-block'>
					Time{' '}
					<span>
						{phenomen?.title && phenomen?.geometry[0]?.date.split('T')[1]}
					</span>
				</div>
				<div className='info-block'>
					Type{' '}
					<span>
						{phenomen?.categories?.map(category => {
							return category.title + ' '
						})}
					</span>
				</div>
				{phenomen?.title && (
					<div className='info-block'>
						Coordinations <span>{cords[0] + ' ' + cords[1]}</span>
					</div>
				)}
			</div>

			{phenomen?.description && (
				<div className='info-block-desc'>
					<h3>Description</h3> <span>{phenomen?.description}</span>
				</div>
			)}

			{phenomen?.title && (
				<YMaps>
					<div className='map'>
						<Map
							height={'600px'}
							width={'70vw'}
							defaultState={{
								center: cords,
								zoom: 8,
							}}
						/>
					</div>
				</YMaps>
			)}
		</article>
	)
}
