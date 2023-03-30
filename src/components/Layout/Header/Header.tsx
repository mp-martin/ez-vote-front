import React from 'react';
import {Logo} from '../Logo/Logo';
import {Navbar} from '../Navbar/Navbar';
import './Header.css';

export const Header = () =>
// C
	(<div className='Header'>
		<div className='Header__wrapper'><Logo/>
			<Navbar/></div>
	</div>);
