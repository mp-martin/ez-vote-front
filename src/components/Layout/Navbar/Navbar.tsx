import React from 'react';
import './Navbar.css';

export const Navbar = () => (<div className='Navbar'>
	<a href='#' style={{textDecoration: 'line-through', opacity: 0.4}}>Login</a>
	<a href='#' style={{color: 'white', fontWeight: 700, textDecoration: 'line-through', opacity: 0.4}}>Sign up</a>
	<a href='#about'>About</a>
</div>);
