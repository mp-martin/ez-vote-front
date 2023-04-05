import React from 'react';
import {Logo} from '../Logo/Logo';
import {Navbar} from '../Navbar/Navbar';
import './Header.css';
import {Link} from 'react-router-dom';

export const Header = () =>
// C
	(<div className='Header'>
		<div className='Header__wrapper'><Link to='/'><Logo/></Link>
			<Navbar/></div>
	</div>);
