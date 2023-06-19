import React from 'react'
import './Navbar.css'
import userAvatar from '../../../assets/user.png'
import { useAuth } from '../../../hooks/use.auth'
import { HashLink as Link } from 'react-router-hash-link'

export const Navbar = () => {
  const { user, logout } = useAuth()
  return (
        <>
            {(user.userLogin !== '') &&
                <div className="navbar__userWidget">
                    <img className="navbar__userWidget_avatar" alt="user avatar" src={userAvatar}/>
                    <p>{user.userLogin}</p>
                </div>}
            <div className='Navbar'>
                {(user.userLogin !== '') && <Link to='/mypolls'>My polls</Link>}
                {(user.userLogin === '') && <Link to='/login'>Log in</Link>}
                {(user.userLogin !== '') && <a href='#' onClick={logout}>Log out</a>}
                <Link to='/#about'>About</Link>
            </div>
        </>
  )
}
