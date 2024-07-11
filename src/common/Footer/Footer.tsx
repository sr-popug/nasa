import { NavLink } from 'react-router-dom'
import logo from '../../../public/nasa-logo.svg'
import './footer.less'

export default function Footer() {
	return (
		<footer>
			<img src={logo} alt='logo' />
			<section className='rows'>
				<article className='row1'>
					<h3>National Aeronautics and Space Administration</h3>
					<p className='aboutNasa'>
						NASA explores the unknown in air and space, innovates for the
						benefit of humanity, and inspires the world through discovery.
					</p>
				</article>
				<article className='row2'>
					<nav>
						<ul>
							<li>
								<NavLink to='/'>Main</NavLink>
							</li>
							<li>
								<NavLink to='/phenomenon'>Natural Phenomenon</NavLink>
							</li>
							<li>
								<NavLink to='/image-of-day'>Images of days</NavLink>
							</li>
							<li>
								<NavLink to='/mars-images'>Mars Images</NavLink>
							</li>
						</ul>
					</nav>
				</article>
			</section>
			<div className='line'></div>
			<div className='reserved'>
				Anton Tsukanov NASA 2024 - All Rights reserved ©
			</div>
		</footer>
	)
}
