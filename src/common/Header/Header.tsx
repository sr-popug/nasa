import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import nasaLogo from '../../../public//nasa-logo.svg'
import './header.less'

export default function Header() {
	const [active, setActive] = useState(false)
	const toggleActive = () => {
		setActive(prev => !prev)
	}
	return (
		<header className='main-header'>
			<NavLink to='/'>
				<img src={nasaLogo} alt='nasa-logo' />
			</NavLink>
			<nav>
				<ul>
					<li>
						<NavLink to='/image-of-day'>Images of Day</NavLink>
					</li>
					<li>
						<NavLink to='/phenomenon'>Natural Phenomenon</NavLink>
					</li>
					<li>
						<NavLink to='/mars-images'>Mars Images</NavLink>
					</li>
				</ul>
			</nav>
			<div
				onClick={toggleActive}
				className={active ? 'hamburger-lines active' : 'hamburger-lines'}
			>
				<span className='line line1'></span>
				<span className='line line2'></span>
				<span className='line line3'></span>
			</div>
			<ul className='hidden'>
				<li>
					<NavLink onClick={toggleActive} to='/'>
						Main
					</NavLink>
				</li>
				<li>
					<NavLink onClick={toggleActive} to='/image-of-day'>
						Images of Day
					</NavLink>
				</li>
				<li>
					<NavLink onClick={toggleActive} to='/phenomenon'>
						Natural Phenomenon
					</NavLink>
				</li>
				<li>
					<NavLink onClick={toggleActive} to='/mars-images'>
						Mars Images
					</NavLink>
				</li>
			</ul>
		</header>
	)
}
